/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/***/ (() => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    fbBlockedSitesActive: true,
    fgTemporarilyBlockedWebsites: JSON.stringify([{
      name: 'youtube.com',
      checked: true
    }, {
      name: 'facebook.com',
      checked: true
    }, {
      name: 'linkedin.com',
      checked: true
    }]),
    fgPermanentlyBlockedWebsites: JSON.stringify([{
      name: 'videa.hu',
      checked: true
    }, {
      name: 'dailymotion.com',
      checked: true
    }])
  }, function () {});
});

// set up initial chrome storage values
var fbBlockedSitesActive = true;
var fgTemporarilyBlockedWebsites = [{
  name: 'youtube.com',
  checked: true
}, {
  name: 'facebook.com',
  checked: true
}, {
  name: 'linkedin.com',
  checked: true
}];
var fgPermanentlyBlockedWebsites = [{
  name: 'videa.hu',
  checked: true
}, {
  name: 'dailymotion.com',
  checked: true
}];
var readStorage = function readStorage() {
  chrome.storage.sync.get(['fbBlockedSitesActive', 'fgTemporarilyBlockedWebsites', 'fgPermanentlyBlockedWebsites'], function (result) {
    fbBlockedSitesActive = result.fbBlockedSitesActive;
    fgTemporarilyBlockedWebsites = JSON.parse(result.fgTemporarilyBlockedWebsites || '[]') || [];
    fgPermanentlyBlockedWebsites = JSON.parse(result.fgPermanentlyBlockedWebsites || '[]') || [];
  });
};
readStorage();
var hide = function hide() {
  if (fbBlockedSitesActive) {
    var rules = _toConsumableArray(fgTemporarilyBlockedWebsites).filter(function (site) {
      return site.checked;
    }).map(function (site, index) {
      return {
        'id': index + 1,
        'priority': 1,
        'action': {
          'type': 'redirect',
          'redirect': {
            'extensionPath': '/message.html'
          }
        },
        'condition': {
          'urlFilter': site.name,
          'resourceTypes': ['main_frame', 'sub_frame']
        }
      };
    });
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({
        length: 10000
      }, function (_, index) {
        return index + 1;
      }),
      addRules: rules
    });
  }
  if (!fbBlockedSitesActive) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({
        length: 10000
      }, function (_, index) {
        return index + 1;
      }),
      addRules: []
    });
  }
};
hide();
var hidePermanently = function hidePermanently() {
  var rules = _toConsumableArray(fgPermanentlyBlockedWebsites).filter(function (site) {
    return site.checked;
  }).map(function (site, index) {
    return {
      'id': index + 10001,
      'priority': 1,
      'action': {
        'type': 'redirect',
        'redirect': {
          'extensionPath': '/message.html'
        }
      },
      'condition': {
        'urlFilter': site.name,
        'resourceTypes': ['main_frame', 'sub_frame']
      }
    };
  });
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({
      length: 10000
    }, function (_, index) {
      return index + 10001;
    }),
    addRules: rules
  });
};
hidePermanently();

// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync') {
    if (changes.fbBlockedSitesActive) {
      fbBlockedSitesActive = changes.fbBlockedSitesActive.newValue;
      hide();
    }
    if (changes.fgTemporarilyBlockedWebsites) {
      fgTemporarilyBlockedWebsites = JSON.parse(changes.fgTemporarilyBlockedWebsites.newValue);
      hide();
    }
    if (changes.fgPermanentlyBlockedWebsites) {
      fgPermanentlyBlockedWebsites = JSON.parse(changes.fgPermanentlyBlockedWebsites.newValue);
      hidePermanently();
    }
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        if (fbBlockedSitesActive) {
          _toConsumableArray(fgTemporarilyBlockedWebsites).filter(function (site) {
            return site.checked;
          }).forEach(function (site) {
            if (tab.url.includes(site.name)) {
              chrome.tabs.remove(tab.id);
            }
          });
        }
        _toConsumableArray(fgPermanentlyBlockedWebsites).filter(function (site) {
          return site.checked;
        }).forEach(function (site) {
          if (tab.url.includes(site.name)) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    });
  }
});

/***/ }),

/***/ "./src/sass/popup.scss":
/*!*****************************!*\
  !*** ./src/sass/popup.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/options.scss":
/*!*******************************!*\
  !*** ./src/sass/options.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/js/background": 0,
/******/ 			"dist/css/options": 0,
/******/ 			"dist/css/popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkPA_Focus_Guard"] = self["webpackChunkPA_Focus_Guard"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["dist/css/options","dist/css/popup"], () => (__webpack_require__("./src/js/background.js")))
/******/ 	__webpack_require__.O(undefined, ["dist/css/options","dist/css/popup"], () => (__webpack_require__("./src/sass/popup.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["dist/css/options","dist/css/popup"], () => (__webpack_require__("./src/sass/options.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;