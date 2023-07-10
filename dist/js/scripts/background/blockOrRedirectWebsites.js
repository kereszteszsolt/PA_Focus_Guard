/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/constants/componentNames.js":
/*!********************************************!*\
  !*** ./src/js/constants/componentNames.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FACEBOOK_DISTRACTION_BLOCKER: () => (/* binding */ FACEBOOK_DISTRACTION_BLOCKER),
/* harmony export */   PERMANENTLY_BLOCKED_WEBSITES: () => (/* binding */ PERMANENTLY_BLOCKED_WEBSITES),
/* harmony export */   TEMPORARILY_BLOCKED_WEBSITES: () => (/* binding */ TEMPORARILY_BLOCKED_WEBSITES),
/* harmony export */   YOUTUBE_DISTRACTION_BLOCKER: () => (/* binding */ YOUTUBE_DISTRACTION_BLOCKER)
/* harmony export */ });
var TEMPORARILY_BLOCKED_WEBSITES = 'TemporarilyBlockedWebsites';
var PERMANENTLY_BLOCKED_WEBSITES = 'PermanentlyBlockedWebsites';
var YOUTUBE_DISTRACTION_BLOCKER = 'YouTubeDistractionBlocker';
var FACEBOOK_DISTRACTION_BLOCKER = 'FacebookDistractionBlocker';

/***/ }),

/***/ "./src/js/constants/componentTitles.js":
/*!*********************************************!*\
  !*** ./src/js/constants/componentTitles.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FACEBOOK_DISTRACTION_BLOCKER: () => (/* binding */ FACEBOOK_DISTRACTION_BLOCKER),
/* harmony export */   PERMANENTLY_BLOCKED_WEBSITES: () => (/* binding */ PERMANENTLY_BLOCKED_WEBSITES),
/* harmony export */   TEMPORARILY_BLOCKED_WEBSITES: () => (/* binding */ TEMPORARILY_BLOCKED_WEBSITES),
/* harmony export */   YOUTUBE_DISTRACTION_BLOCKER: () => (/* binding */ YOUTUBE_DISTRACTION_BLOCKER)
/* harmony export */ });
var TEMPORARILY_BLOCKED_WEBSITES = 'Temporarily Blocked Websites';
var PERMANENTLY_BLOCKED_WEBSITES = 'Permanently Blocked Websites';
var YOUTUBE_DISTRACTION_BLOCKER = 'YouTube Distraction Blocker';
var FACEBOOK_DISTRACTION_BLOCKER = 'Facebook Distraction Blocker';

/***/ }),

/***/ "./src/js/constants/containerComponents.js":
/*!*************************************************!*\
  !*** ./src/js/constants/containerComponents.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLOCKED_WEBSITES_BY_DOMAIN: () => (/* binding */ BLOCKED_WEBSITES_BY_DOMAIN),
/* harmony export */   WEBSITE_ELEMENT_BLOCKER: () => (/* binding */ WEBSITE_ELEMENT_BLOCKER)
/* harmony export */ });
var BLOCKED_WEBSITES_BY_DOMAIN = 'BlockedWebsitesByDomain';
var WEBSITE_ELEMENT_BLOCKER = 'WebsiteElementBlocker';

/***/ }),

/***/ "./src/js/constants/index.js":
/*!***********************************!*\
  !*** ./src/js/constants/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentNames: () => (/* reexport module object */ _componentNames__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   componentTitles: () => (/* reexport module object */ _componentTitles__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   containerComponents: () => (/* reexport module object */ _containerComponents__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   storageNames: () => (/* reexport module object */ _storageNames__WEBPACK_IMPORTED_MODULE_2__)
/* harmony export */ });
/* harmony import */ var _componentNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./componentNames */ "./src/js/constants/componentNames.js");
/* harmony import */ var _componentTitles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./componentTitles */ "./src/js/constants/componentTitles.js");
/* harmony import */ var _storageNames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storageNames */ "./src/js/constants/storageNames.js");
/* harmony import */ var _containerComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containerComponents */ "./src/js/constants/containerComponents.js");









/***/ }),

/***/ "./src/js/constants/storageNames.js":
/*!******************************************!*\
  !*** ./src/js/constants/storageNames.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FACEBOOK_DISTRACTION_BLOCKER: () => (/* binding */ FACEBOOK_DISTRACTION_BLOCKER),
/* harmony export */   FOCUS_MODE_ACTIVE: () => (/* binding */ FOCUS_MODE_ACTIVE),
/* harmony export */   PERMANENTLY_BLOCKED_WEBSITES: () => (/* binding */ PERMANENTLY_BLOCKED_WEBSITES),
/* harmony export */   TEMPORARILY_BLOCKED_WEBSITES: () => (/* binding */ TEMPORARILY_BLOCKED_WEBSITES),
/* harmony export */   YOUTUBE_DISTRACTION_BLOCKER: () => (/* binding */ YOUTUBE_DISTRACTION_BLOCKER)
/* harmony export */ });
var FOCUS_MODE_ACTIVE = 'fgFocusModeActive';
var TEMPORARILY_BLOCKED_WEBSITES = 'fgTemporarilyBlockedWebsites';
var PERMANENTLY_BLOCKED_WEBSITES = 'fgPermanentlyBlockedWebsites';
var YOUTUBE_DISTRACTION_BLOCKER = 'fgYouTubeDistractionBlocker';
var FACEBOOK_DISTRACTION_BLOCKER = 'fgFacebookDistractionBlocker';

/***/ }),

/***/ "./src/js/defaults/defaultData.js":
/*!****************************************!*\
  !*** ./src/js/defaults/defaultData.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domains4Perm: () => (/* reexport safe */ _defaultDomainsForPermanentlyBlock__WEBPACK_IMPORTED_MODULE_3__.domains4Perm),
/* harmony export */   domains4Temp: () => (/* reexport safe */ _defaultDomainsForTemporarilyBlock__WEBPACK_IMPORTED_MODULE_2__.domains4Temp),
/* harmony export */   facebook: () => (/* reexport safe */ _defaultsForFacebook__WEBPACK_IMPORTED_MODULE_1__.facebook),
/* harmony export */   youtube: () => (/* reexport safe */ _defaultsForYoutube__WEBPACK_IMPORTED_MODULE_0__.youtube)
/* harmony export */ });
/* harmony import */ var _defaultsForYoutube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultsForYoutube */ "./src/js/defaults/defaultsForYoutube.js");
/* harmony import */ var _defaultsForFacebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultsForFacebook */ "./src/js/defaults/defaultsForFacebook.js");
/* harmony import */ var _defaultDomainsForTemporarilyBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultDomainsForTemporarilyBlock */ "./src/js/defaults/defaultDomainsForTemporarilyBlock.js");
/* harmony import */ var _defaultDomainsForPermanentlyBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultDomainsForPermanentlyBlock */ "./src/js/defaults/defaultDomainsForPermanentlyBlock.js");





/***/ }),

/***/ "./src/js/defaults/defaultDomainsForPermanentlyBlock.js":
/*!**************************************************************!*\
  !*** ./src/js/defaults/defaultDomainsForPermanentlyBlock.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domains4Perm: () => (/* binding */ domains4Perm)
/* harmony export */ });
var domains4Perm = [{
  name: "example.com",
  checked: false
}];

/***/ }),

/***/ "./src/js/defaults/defaultDomainsForTemporarilyBlock.js":
/*!**************************************************************!*\
  !*** ./src/js/defaults/defaultDomainsForTemporarilyBlock.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domains4Temp: () => (/* binding */ domains4Temp)
/* harmony export */ });
var domains4Temp = [{
  name: 'youtube.com',
  checked: true
}, {
  name: 'facebook.com',
  checked: true
}, {
  name: 'instagram.com',
  checked: true
}, {
  name: 'tiktok.com',
  checked: true
}, {
  name: 'twitter.com',
  checked: true
}, {
  name: 'linkedin.com',
  checked: true
}, {
  name: 'reddit.com',
  checked: true
}, {
  name: 'pinterest.com',
  checked: true
}, {
  name: 'tumblr.com',
  checked: true
}, {
  name: 'snapchat.com',
  checked: true
}, {
  name: 'quora.com',
  checked: true
}, {
  name: 'flickr.com',
  checked: true
}, {
  name: 'vimeo.com',
  checked: true
}, {
  name: 'myspace.com',
  checked: true
}, {
  name: 'meetup.com',
  checked: true
}, {
  name: 'medium.com',
  checked: true
}, {
  name: 'tinder.com',
  checked: true
}, {
  name: 'netflix.com',
  checked: true
}, {
  name: 'hulu.com',
  checked: true
}, {
  name: 'amazon.com',
  checked: true
}];

/***/ }),

/***/ "./src/js/defaults/defaultsForFacebook.js":
/*!************************************************!*\
  !*** ./src/js/defaults/defaultsForFacebook.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   facebook: () => (/* binding */ facebook)
/* harmony export */ });
var facebook = [{
  name: 'Facebook - Reels',
  actionDescription: 'Redirect to message',
  action: 'remove',
  activeRule: true,
  permanently: false
}];

/***/ }),

/***/ "./src/js/defaults/defaultsForYoutube.js":
/*!***********************************************!*\
  !*** ./src/js/defaults/defaultsForYoutube.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   youtube: () => (/* binding */ youtube)
/* harmony export */ });
var youtube = [{
  name: "Youtube - Shorts",
  actionDescription: "Redirect to message",
  action: "remove",
  activeRule: true,
  permanently: false
}, {
  name: "Youtube - Home",
  actionDescription: "Redirect to message",
  action: "remove",
  activeRule: true,
  permanently: false
}];

/***/ }),

/***/ "./src/js/scripts/utils/conversions.js":
/*!*********************************************!*\
  !*** ./src/js/scripts/utils/conversions.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertHashToPascalCase: () => (/* binding */ convertHashToPascalCase),
/* harmony export */   convertPascalCaseToHash: () => (/* binding */ convertPascalCaseToHash)
/* harmony export */ });
function convertHashToPascalCase(hash) {
  // Convert the hash to PascalCase (e.g. #temporarily-blocked-sites -> TemporarilyBlockedSites
  return hash.replace('#', '').replace(/-(\w)/g, function (_, c) {
    return c.toUpperCase();
  }).replace(/\b(\w)/g, function (c) {
    return c.toUpperCase();
  });
}
function convertPascalCaseToHash(pascalCase) {
  var dashedString = pascalCase.replace(/([a-z])([A-Z])/g, '$1-$2') // Insert a dash before each uppercase letter
  .toLowerCase(); // Convert the string to lowercase
  return "#".concat(dashedString);
}

/***/ }),

/***/ "./src/js/scripts/utils/dataAccess.js":
/*!********************************************!*\
  !*** ./src/js/scripts/utils/dataAccess.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadData: () => (/* binding */ loadData),
/* harmony export */   saveData: () => (/* binding */ saveData)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function loadData(storageName, defaultData) {
  var result;
  var storedData = chrome.storage.sync.get(storageName, function (data) {});
  if (storedData) {
    result = JSON.parse(storedData);
  } else {
    result = defaultData;
  }
  return result;
}
function saveData(storageName, data) {
  chrome.storage.sync.set(_defineProperty({}, storageName, JSON.stringify(data)), function () {});
}

/***/ }),

/***/ "./src/js/scripts/utils/index.js":
/*!***************************************!*\
  !*** ./src/js/scripts/utils/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   conversions: () => (/* reexport module object */ _conversions__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   dataAccess: () => (/* reexport module object */ _dataAccess__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _conversions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversions */ "./src/js/scripts/utils/conversions.js");
/* harmony import */ var _dataAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataAccess */ "./src/js/scripts/utils/dataAccess.js");





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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************************!*\
  !*** ./src/js/scripts/background/blockOrRedirectWebsites.js ***!
  \**************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockOrRedirectWebsitesSetup: () => (/* binding */ blockOrRedirectWebsitesSetup)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/js/scripts/utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./src/js/constants/index.js");
/* harmony import */ var _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../defaults/defaultData */ "./src/js/defaults/defaultData.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



var activeRules = [];
var ruleIds = [];

// set up initial chrome storage values
var fgFocusModeActive = false;
var fgTemporarilyBlockedWebsites = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.domains4Temp;
var fgPermanentlyBlockedWebsites = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.domains4Perm;
var fgFacebookDistractionBlocker = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.facebook;
var fgYouTubeDistractionBlocker = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.youtube;
var readStorage = function readStorage() {
  fgFocusModeActive = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.FOCUS_MODE_ACTIVE, false);
  fgTemporarilyBlockedWebsites = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.TEMPORARILY_BLOCKED_WEBSITES, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.domains4Temp);
  fgPermanentlyBlockedWebsites = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.PERMANENTLY_BLOCKED_WEBSITES, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.domains4Perm);
  fgFacebookDistractionBlocker = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.FACEBOOK_DISTRACTION_BLOCKER, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.facebook);
  fgYouTubeDistractionBlocker = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.YOUTUBE_DISTRACTION_BLOCKER, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.youtube);
};
var blockOrRedirectWebsitesSetup = function blockOrRedirectWebsitesSetup() {
  readStorage();
  blockOrAllow();
  // any time a storage item is updated, update global variables
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync') {
      if (changes.fbBlockedSitesActive) {
        fgFocusModeActive = changes.fbBlockedSitesActive.newValue;
        blockOrAllow();
      }
      if (changes.fgTemporarilyBlockedWebsites) {
        fgTemporarilyBlockedWebsites = JSON.parse(changes.fgTemporarilyBlockedWebsites.newValue);
        blockOrAllow();
      }
      if (changes.fgPermanentlyBlockedWebsites) {
        fgPermanentlyBlockedWebsites = JSON.parse(changes.fgPermanentlyBlockedWebsites.newValue);
        blockOrAllow();
      }
      chrome.tabs.query({}, function (tabs) {
        // loop through all tabs and close any that are on the blocked list
        tabs.forEach(function (tab) {
          if (fgFocusModeActive) {
            fgTemporarilyBlockedWebsites.filter(function (site) {
              return site.checked;
            }).forEach(function (site) {
              if (tab.url.includes(site.name)) {
                chrome.tabs.remove(tab.id);
              }
            });
          }
          fgPermanentlyBlockedWebsites.filter(function (site) {
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
};
var blockOrAllow = function blockOrAllow() {
  var _ruleIds;
  var rules = [];
  var index = 1;
  (_ruleIds = ruleIds).push.apply(_ruleIds, _toConsumableArray(activeRules.map(function (rule) {
    return rule.id;
  })));
  console.log('ruleIds:', ruleIds);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ruleIds,
    addRules: []
  });
  fgTemporarilyBlockedWebsites = fgTemporarilyBlockedWebsites.map(function (site) {
    return _objectSpread(_objectSpread({}, site), {}, {
      ruleId: index++
    });
  });
  fgPermanentlyBlockedWebsites = fgPermanentlyBlockedWebsites.map(function (site) {
    return _objectSpread(_objectSpread({}, site), {}, {
      ruleId: index++
    });
  });
  console.log('fgTemporarilyBlockedWebsites:', fgTemporarilyBlockedWebsites);
  console.log('fgPermanentlyBlockedWebsites:', fgPermanentlyBlockedWebsites);
  var tempRules = [];
  if (fgFocusModeActive) {
    tempRules = fgTemporarilyBlockedWebsites.filter(function (site) {
      return site.checked;
    }).map(function (site) {
      return {
        id: site.ruleId,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            extensionPath: '/message.html'
          }
        },
        condition: {
          urlFilter: site.name,
          resourceTypes: ['main_frame', 'sub_frame']
        }
      };
    });
  }
  rules.push.apply(rules, _toConsumableArray(tempRules));
  var permRules = fgPermanentlyBlockedWebsites.filter(function (site) {
    return site.checked;
  }).map(function (site) {
    return {
      id: site.ruleId,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: {
          extensionPath: '/message.html'
        }
      },
      condition: {
        urlFilter: site.name,
        resourceTypes: ['main_frame', 'sub_frame']
      }
    };
  });
  rules.push.apply(rules, _toConsumableArray(permRules));
  console.log('rules:', rules);
  activeRules = [].concat(rules);
  ruleIds = _toConsumableArray(activeRules.map(function (rule) {
    return rule.id;
  }));
  console.log('ruleIds:', ruleIds);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ruleIds,
    addRules: activeRules
  });
};
})();

/******/ })()
;