const getDynamicRules = () => {
  return new Promise((resolve, reject) => {
    chrome.declarativeNetRequest.getDynamicRules(null, (rules) => {
      if (chrome.runtime.lastError) {
        reject(
          new Error(
            `Error getting dynamic rules: ${chrome.runtime.lastError.message}`,
          ),
        );
      }
      resolve(rules);
    });
  });
};

const createFGRule = (item, index) => ({
  id: index,
  priority: 1,
  action: {
    type: "redirect",
    redirect: { extensionPath: "/html/message.html" },
  },
  condition: {
    urlFilter: item.url,
    resourceTypes: ["main_frame", "sub_frame"],
  },
});

const calculateNewDynamicRules = (
  focusMode,
  fgBlockedWebsitesByDomain,
  fgBlockedWebsitesByUrl,
) => {
  return new Promise((resolve) => {
    const rules = [];
    let index = 1;

    // Combine filtering and mapping for domain and URL rules
    [...fgBlockedWebsitesByDomain, ...fgBlockedWebsitesByUrl].forEach(
      (item) => {
        if (item.isMarkedForBlock && (focusMode || item.isPermanentlyBlocked)) {
          rules.push(createFGRule(item, index++));
        }
      },
    );
    resolve(rules);
  });
};

const applyNewDynamicRules = (rules, oldRulesId) => {
  return new Promise((resolve) => {
    chrome.declarativeNetRequest.updateDynamicRules(
      { removeRuleIds: oldRulesId, addRules: rules },
      resolve,
    );
  });
};

const closeBlockedTabs = (
  focusMode,
  fgBlockedWebsitesByDomain,
  fgBlockedWebsitesByUrl,
) => {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      const blockedItems = [
        ...fgBlockedWebsitesByDomain,
        ...fgBlockedWebsitesByUrl,
      ].filter(
        (item) =>
          item.isMarkedForBlock && (focusMode || item.isPermanentlyBlocked),
      );

      blockedItems.forEach((item) => {
        tabs.forEach((tab) => {
          if (tab.url.includes(item.url)) {
            //chrome.tabs.remove(tab.id);
            chrome.tabs.update(tab.id, { url: "/html/message.html" });
          }
        });
      });

      resolve();
    });
  });
};

export const blockOrAllow = async (
  focusMode,
  fgBlockedWebsitesByDomain,
  fgBlockedWebsitesByUrl,
) => {
  const rules = await calculateNewDynamicRules(
    focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
  const oldRules = await getDynamicRules();
  const oldRuleIds = oldRules.map((rule) => rule.id);

  await applyNewDynamicRules(rules, oldRuleIds);

  await closeBlockedTabs(
    focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
};
