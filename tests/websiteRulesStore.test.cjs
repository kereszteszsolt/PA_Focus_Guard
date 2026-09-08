// Run with: node --test tests/websiteRulesStore.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const pinia = require('pinia');

// Compile the actual sources with existing tooling; only Chrome storage is faked.
function loadSource(file, dependencies = {}, chrome) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'chrome', outputText)(name => {
    assert(Object.hasOwn(dependencies, name), `Unexpected import: ${name}`);
    return dependencies[name];
  }, module, module.exports, chrome);
  return module.exports;
}

const constants = {
  storage: loadSource('src/constants/localStorage.ts'),
  wsrFilter: loadSource('src/constants/wsr-filter.ts')
};
const unique = loadSource('src/utils/unique.ts', { uuid: require('uuid') });
const order = loadSource('src/utils/order.ts');
const rulesKey = constants.storage.FG_WEBSITE_RULES;

async function fixture(legacy = true) {
  const saved = {};
  const chrome = { storage: { local: {
    get(keys, callback) { callback(Object.fromEntries(keys.map(key => [key, saved[key]]))); },
    set(values, callback) { Object.assign(saved, structuredClone(values)); callback(); }
  } } };
  const utils = { unique, order, data: loadSource('src/utils/data.ts', {}, chrome) };
  const dependencies = { '@/utils': utils, '@/constants': constants };
  const { initDefaultWebsites } = loadSource('src/setup/initialize/initDefaultWebsites.ts', {
    ...dependencies, '../../utils/unique': unique
  });
  await initDefaultWebsites();
  if (legacy) {
    const rules = JSON.parse(saved[rulesKey]);
    for (const rule of rules.filter(rule => rule.urlFilterType === constants.wsrFilter.URL)) {
      rule.localOrder += 17;
      rule.globalOrder += 9;
    }
    // The backing array need not be in display order after local moves.
    saved[rulesKey] = JSON.stringify(rules.reverse());
  }
  const { useWebsiteRulesStore } = loadSource('src/store/websiteRulesStore.ts', {
    ...dependencies, pinia
  });
  const store = useWebsiteRulesStore(pinia.createPinia());
  await store.fetchData();
  return { store, saved };
}

const canonical = rules => JSON.parse(JSON.stringify(rules)).sort((a, b) => a.id.localeCompare(b.id));
const displayed = (rules, field) => [...rules].sort((a, b) => a[field] - b[field]).map(rule => rule.urlFilter);
const watchUrl = 'https://www.facebook.com/watch';
const reelUrl = 'https://www.facebook.com/reel';

test('new installations use contiguous global and per-list order values', async () => {
  const { store } = await fixture(false);
  assert.equal(store.allWebsiteRules.length, 15);
  assert.deepEqual(store.allWebsiteRules.map(rule => rule.globalOrder), Array.from({ length: 15 }, (_, i) => i));
  for (const list of store.websiteRuleLists) {
    const rules = store.getWebsiteRulesByListId(list.id);
    assert.deepEqual(rules.map(rule => rule.localOrder), rules.map((_, i) => i));
  }
});

test('loading legacy data needs no migration and does not rewrite storage', async () => {
  const { store, saved } = await fixture();
  const before = structuredClone(saved);
  await store.fetchData();
  assert.deepEqual(saved, before);
  assert.equal(store.allWebsiteRules.find(rule => rule.urlFilter === watchUrl).globalOrder, 17);
});

for (const legacy of [true, false]) {
  test(`${legacy ? 'legacy' : 'fresh'} global moves cross the domain/URL boundary and persist`, async () => {
    const { store } = await fixture(legacy);
    const original = canonical(store.allWebsiteRules);
    const rule = store.allWebsiteRules.find(rule => rule.urlFilter === watchUrl);
    const previous = store.allWebsiteRules.find(rule => rule.urlFilter === 'pinterest.com');
    const expected = structuredClone(original);
    expected.find(item => item.id === rule.id).globalOrder = previous.globalOrder;
    expected.find(item => item.id === previous.id).globalOrder = rule.globalOrder;
    await store.moveUpWebsiteRulesGlobalOrder(rule.id);
    assert.deepEqual(canonical(store.allWebsiteRules), expected);
    assert.deepEqual(displayed(store.allWebsiteRules, 'globalOrder').slice(7, 10), [watchUrl, 'pinterest.com', reelUrl]);
    await store.fetchData();
    assert.deepEqual(canonical(store.allWebsiteRules), expected);
    await store.moveDownWebsiteRulesGlobalOrder(rule.id);
    assert.deepEqual(canonical(store.allWebsiteRules), original);
  });

  test(`${legacy ? 'legacy' : 'fresh'} local moves preserve global order, flags and other lists`, async () => {
    const { store } = await fixture(legacy);
    const original = canonical(store.allWebsiteRules);
    const rule = store.allWebsiteRules.find(rule => rule.urlFilter === reelUrl);
    const previous = store.allWebsiteRules.find(rule => rule.urlFilter === watchUrl);
    const expected = structuredClone(original);
    expected.find(item => item.id === rule.id).localOrder = previous.localOrder;
    expected.find(item => item.id === previous.id).localOrder = rule.localOrder;
    await store.moveUpWebsiteRule(rule.id);
    assert.deepEqual(canonical(store.allWebsiteRules), expected);
    assert.deepEqual(displayed(store.getWebsiteRulesByListId(rule.listId), 'localOrder').slice(0, 2), [reelUrl, watchUrl]);
    await store.fetchData();
    assert.deepEqual(canonical(store.allWebsiteRules), expected);
    await store.moveDownWebsiteRule(rule.id);
    assert.deepEqual(canonical(store.allWebsiteRules), original);
  });
}

test('first/last rows, missing IDs, empty lists and single rows do not wrap or change', async () => {
  const { store } = await fixture();
  for (const field of ['order', 'localOrder', 'globalOrder']) {
    for (const list of [[], [{ id: 'a', [field]: 17 }], [{ id: 'b', [field]: 23 }, { id: 'a', [field]: 17 }]]) {
      const before = structuredClone(list);
      for (const [id, direction] of [['a', 'up'], ['missing', 'up'], ['missing', 'down'], [list.length === 2 ? 'b' : 'a', 'down']]) {
        assert.equal(store._moveItem(list, id, direction, field), list);
        assert.deepEqual(list, before);
      }
    }
  }
});

test('sidebar list moves remain independent of rule order and survive reload', async () => {
  const { store } = await fixture();
  const originalRules = canonical(store.allWebsiteRules);
  const first = store.websiteRuleLists[0], second = store.websiteRuleLists[1];
  await store.moveUpWebsiteRuleList(second.id);
  await store.fetchData();
  assert.deepEqual(store.getWebsiteRuleLists.map(list => list.id), [second.id, first.id]);
  assert.deepEqual(canonical(store.allWebsiteRules), originalRules);
  await store.moveDownWebsiteRuleList(second.id);
  assert.deepEqual(store.getWebsiteRuleLists.map(list => list.id), [first.id, second.id]);
});

test('adding, editing and deleting rules still work after moving a legacy row', async () => {
  const { store } = await fixture();
  const moved = store.allWebsiteRules.find(rule => rule.urlFilter === watchUrl);
  await store.moveUpWebsiteRulesGlobalOrder(moved.id);
  await store.addWebsiteRule({ ...store.getDummyWebsiteRule, listId: moved.listId, urlFilter: 'https://example.com/page' });
  const added = store.allWebsiteRules.find(rule => rule.urlFilter === 'https://example.com/page');
  assert.equal(new Set(store.allWebsiteRules.map(rule => rule.globalOrder)).size, store.allWebsiteRules.length);
  const local = store.getWebsiteRulesByListId(moved.listId);
  assert.equal(new Set(local.map(rule => rule.localOrder)).size, local.length);
  await store.updateWebsiteRule(added.id, { ...added, urlFilter: 'https://example.com/edited', permanentlyActive: true });
  await store.fetchData();
  assert.equal(store.getWebsiteRuleById(added.id).urlFilter, 'https://example.com/edited');
  assert.equal(store.getWebsiteRuleById(added.id).permanentlyActive, true);
  const beforeDelete = displayed(store.allWebsiteRules, 'globalOrder').filter(url => url !== 'https://example.com/edited');
  await store.deleteWebsiteRule(added.id);
  await store.fetchData();
  assert.deepEqual(displayed(store.allWebsiteRules, 'globalOrder'), beforeDelete);
  await store.moveDownWebsiteRulesGlobalOrder(moved.id);
  assert.deepEqual(displayed(store.allWebsiteRules, 'globalOrder').slice(7, 9), ['pinterest.com', watchUrl]);
});
