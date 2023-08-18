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

// const removeDynamicRules = (ruleIds) => {
//   return new Promise((resolve, reject) => {
//     chrome.declarativeNetRequest.updateDynamicRules(
//       { removeRuleIds: ruleIds },
//       () => {
//         if (chrome.runtime.lastError) {
//           reject(
//             new Error(
//               `Error removing rules: ${chrome.runtime.lastError.message}`,
//             ),
//           );
//         }
//         resolve();
//       },
//     );
//   });
// };
// const getAndRemoveOldDynamicRules = async () => {
//   const rules = await getDynamicRules();
//   const ruleIds = rules.map((rule) => rule.id);
//   console.log("ruleIds", ruleIds);
//   await removeDynamicRules(ruleIds);
// };

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
    console.log("rules", rules);
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

      console.log("blockedItems", blockedItems);
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
  console.log("blockOrAllow............");
  console.log("focusMode", focusMode);
  console.log("focusMode == true", focusMode == true);
  console.log("focusMode === true", focusMode === true);
  if (focusMode) {
    console.log("focusMode is true");
  }

  // console.log("1.a start block and remove old rules");
  //await getAndRemoveOldDynamicRules();
  //console.log("1.b end block and remove old rules");
  //console.log("2.a start calculate new rules");
  const rules = await calculateNewDynamicRules(
    focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
  // console.log("2.b end calculate new rules");
  //  console.log("3.a start apply new rules");
  const oldRules = await getDynamicRules();
  const oldRuleIds = oldRules.map((rule) => rule.id);

  await applyNewDynamicRules(rules, oldRuleIds);

  // console.log("3.b end apply new rules");
  console.log("4.a start close blocked tabs");
  await closeBlockedTabs(
    focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
  //console.log("4.b end close blocked tabs");
};
