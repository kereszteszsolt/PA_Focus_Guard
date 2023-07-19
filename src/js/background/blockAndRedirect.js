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

const removeDynamicRules = (ruleIds) => {
  return new Promise((resolve, reject) => {
    chrome.declarativeNetRequest.updateDynamicRules(
      { removeRuleIds: ruleIds },
      () => {
        if (chrome.runtime.lastError) {
          reject(
            new Error(
              `Error removing rules: ${chrome.runtime.lastError.message}`,
            ),
          );
        }
        resolve();
      },
    );
  });
};
const getAndRemoveOldDynamicRules = async () => {
  const rules = await getDynamicRules();
  const ruleIds = rules.map((rule) => rule.id);
  console.log("ruleIds", ruleIds);
  await removeDynamicRules(ruleIds);
};

const createFGRule = (item, index) => ({
  id: index,
  priority: 1,
  action: {
    type: "redirect",
    redirect: { extensionPath: "/message.html" },
  },
  condition: {
    urlFilter: item.url,
    resourceTypes: ["main_frame", "sub_frame"],
  },
});

const calculateNewDynamicRules = (
  fgActive,
  fgBlockedWebsitesByDomain,
  fgBlockedWebsitesByUrl,
) => {
  return new Promise((resolve) => {
    const rules = [];
    let index = 1;

    // Combine filtering and mapping for domain and URL rules
    [...fgBlockedWebsitesByDomain, ...fgBlockedWebsitesByUrl].forEach(
      (item) => {
        if (item.isMarkedForBlock && (fgActive || item.isPermanentlyBlocked)) {
          rules.push(createFGRule(item, index++));
        }
      },
    );
    console.log("rules", rules);
    resolve(rules);
  });
};

const applyNewDynamicRules = (rules) => {
  return new Promise((resolve) => {
    if (rules.length === 0) {
      chrome.declarativeNetRequest.updateDynamicRules(
        { addRules: rules },
        resolve,
      );
    }
  });
};

const closeBlockedTabs = (
  fgActive,
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
          item.isMarkedForBlock && (fgActive || item.isPermanentlyBlocked),
      );

      blockedItems.forEach((item) => {
        tabs.forEach((tab) => {
          if (tab.url.includes(item.url)) {
            chrome.tabs.remove(tab.id);
          }
        });
      });

      resolve();
    });
  });
};

export const blockOrAllow = async (
  fgActive,
  fgBlockedWebsitesByDomain,
  fgBlockedWebsitesByUrl,
) => {
  console.log("1.a start block and remove old rules");
  await getAndRemoveOldDynamicRules();
  console.log("1.b end block and remove old rules");
  console.log("2.a start calculate new rules");
  const rules = await calculateNewDynamicRules(
    fgActive,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
  console.log("2.b end calculate new rules");
  console.log("3.a start apply new rules");
  await applyNewDynamicRules(rules);
  console.log("3.b end apply new rules");
  console.log("4.a start close blocked tabs");
  await closeBlockedTabs(
    fgActive,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
  console.log("4.b end close blocked tabs");
};
