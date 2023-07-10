/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/utils */ "./src/js/scripts/utils/index.js");
/* harmony import */ var _defaults_defaultComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults/defaultComponents */ "./src/js/defaults/defaultComponents.js");
/* harmony import */ var _scripts_background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/background */ "./src/js/scripts/background/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/js/constants/index.js");





// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
  _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.saveData(_constants__WEBPACK_IMPORTED_MODULE_3__.storageNames.FOCUS_MODE_ACTIVE, false);
  _defaults_defaultComponents__WEBPACK_IMPORTED_MODULE_1__.defaultComponents.forEach(function (component) {
    _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.saveData(component.storageName, component.defaultData);
  });
});
_scripts_background__WEBPACK_IMPORTED_MODULE_2__.blockOrRedirectWebsitesSetup();
_scripts_background__WEBPACK_IMPORTED_MODULE_2__.websiteElementsBlockerSetup();

/***/ }),

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

/***/ "./src/js/defaults/defaultComponents.js":
/*!**********************************************!*\
  !*** ./src/js/defaults/defaultComponents.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultComponents: () => (/* binding */ defaultComponents)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/js/constants/index.js");
/* harmony import */ var _defaultData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultData */ "./src/js/defaults/defaultData.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


var defaultComponents = [{
  name: _constants__WEBPACK_IMPORTED_MODULE_0__.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
  title: _constants__WEBPACK_IMPORTED_MODULE_0__.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
  storageName: _constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
  containerComponent: _constants__WEBPACK_IMPORTED_MODULE_0__.containerComponents.BLOCKED_WEBSITES_BY_DOMAIN,
  data: [],
  defaultData: _toConsumableArray(_defaultData__WEBPACK_IMPORTED_MODULE_1__.domains4Temp)
}, {
  name: _constants__WEBPACK_IMPORTED_MODULE_0__.componentNames.PERMANENTLY_BLOCKED_WEBSITES,
  title: _constants__WEBPACK_IMPORTED_MODULE_0__.componentTitles.PERMANENTLY_BLOCKED_WEBSITES,
  storageName: _constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.PERMANENTLY_BLOCKED_WEBSITES,
  containerComponent: _constants__WEBPACK_IMPORTED_MODULE_0__.containerComponents.BLOCKED_WEBSITES_BY_DOMAIN,
  data: [],
  defaultData: _toConsumableArray(_defaultData__WEBPACK_IMPORTED_MODULE_1__.domains4Perm)
}, {
  name: _constants__WEBPACK_IMPORTED_MODULE_0__.componentNames.YOUTUBE_DISTRACTION_BLOCKER,
  title: _constants__WEBPACK_IMPORTED_MODULE_0__.componentTitles.YOUTUBE_DISTRACTION_BLOCKER,
  storageName: _constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.YOUTUBE_DISTRACTION_BLOCKER,
  containerComponent: _constants__WEBPACK_IMPORTED_MODULE_0__.containerComponents.WEBSITE_ELEMENT_BLOCKER,
  data: [],
  defaultData: _toConsumableArray(_defaultData__WEBPACK_IMPORTED_MODULE_1__.youtube)
}, {
  name: _constants__WEBPACK_IMPORTED_MODULE_0__.componentNames.FACEBOOK_DISTRACTION_BLOCKER,
  title: _constants__WEBPACK_IMPORTED_MODULE_0__.componentTitles.FACEBOOK_DISTRACTION_BLOCKER,
  storageName: _constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.FACEBOOK_DISTRACTION_BLOCKER,
  containerComponent: _constants__WEBPACK_IMPORTED_MODULE_0__.containerComponents.WEBSITE_ELEMENT_BLOCKER,
  data: [],
  defaultData: _toConsumableArray(_defaultData__WEBPACK_IMPORTED_MODULE_1__.facebook)
}];

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

/***/ "./src/js/scripts/background/blockOrRedirectWebsites.js":
/*!**************************************************************!*\
  !*** ./src/js/scripts/background/blockOrRedirectWebsites.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
var readStorage = function readStorage() {
  fgFocusModeActive = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.FOCUS_MODE_ACTIVE, false);
  fgTemporarilyBlockedWebsites = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.TEMPORARILY_BLOCKED_WEBSITES, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.domains4Temp);
  fgPermanentlyBlockedWebsites = _utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_1__.storageNames.PERMANENTLY_BLOCKED_WEBSITES, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_2__.domains4Perm);
};
var blockOrRedirectWebsitesSetup = function blockOrRedirectWebsitesSetup() {
  readStorage();
  blockOrAllow();
  // any time a storage item is updated, update global variables
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync') {
      if (changes.fgFocusModeActive) {
        fgFocusModeActive = changes.fgFocusModeActive.newValue;
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

/***/ }),

/***/ "./src/js/scripts/background/facebookElementsBlocker.js":
/*!**************************************************************!*\
  !*** ./src/js/scripts/background/facebookElementsBlocker.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   facebookElementsBlocker: () => (/* binding */ facebookElementsBlocker)
/* harmony export */ });
var facebookElementsBlocker = function facebookElementsBlocker(active, facebookElements) {
  facebookElements.forEach(function (element) {
    switch (element) {
      case 'facebook-thumbnails':
        break;
      case 'recommended':
        break;
    }
  });
};

/***/ }),

/***/ "./src/js/scripts/background/index.js":
/*!********************************************!*\
  !*** ./src/js/scripts/background/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockOrRedirectWebsitesSetup: () => (/* reexport safe */ _blockOrRedirectWebsites__WEBPACK_IMPORTED_MODULE_3__.blockOrRedirectWebsitesSetup),
/* harmony export */   facebookElementsBlocker: () => (/* reexport safe */ _facebookElementsBlocker__WEBPACK_IMPORTED_MODULE_0__.facebookElementsBlocker),
/* harmony export */   websiteElementsBlockerSetup: () => (/* reexport safe */ _websiteElementsBlocker__WEBPACK_IMPORTED_MODULE_2__.websiteElementsBlockerSetup),
/* harmony export */   youtubeElementsBlocker: () => (/* reexport safe */ _youtubeElementsBlocker__WEBPACK_IMPORTED_MODULE_1__.youtubeElementsBlocker)
/* harmony export */ });
/* harmony import */ var _facebookElementsBlocker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./facebookElementsBlocker */ "./src/js/scripts/background/facebookElementsBlocker.js");
/* harmony import */ var _youtubeElementsBlocker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./youtubeElementsBlocker */ "./src/js/scripts/background/youtubeElementsBlocker.js");
/* harmony import */ var _websiteElementsBlocker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./websiteElementsBlocker */ "./src/js/scripts/background/websiteElementsBlocker.js");
/* harmony import */ var _blockOrRedirectWebsites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blockOrRedirectWebsites */ "./src/js/scripts/background/blockOrRedirectWebsites.js");





/***/ }),

/***/ "./src/js/scripts/background/websiteElementsBlocker.js":
/*!*************************************************************!*\
  !*** ./src/js/scripts/background/websiteElementsBlocker.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   websiteElementsBlockerSetup: () => (/* binding */ websiteElementsBlockerSetup)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/js/constants/index.js");
/* harmony import */ var _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../defaults/defaultData */ "./src/js/defaults/defaultData.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/js/scripts/utils/index.js");
/* harmony import */ var _youtubeElementsBlocker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./youtubeElementsBlocker */ "./src/js/scripts/background/youtubeElementsBlocker.js");
/* harmony import */ var _facebookElementsBlocker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./facebookElementsBlocker */ "./src/js/scripts/background/facebookElementsBlocker.js");





var fgFocusModeActive = false;
var fgFacebookDistractionBlocker = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.facebook;
var fgYouTubeDistractionBlocker = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.youtube;
var readStorage = function readStorage() {
  fgFocusModeActive = _utils__WEBPACK_IMPORTED_MODULE_2__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.FOCUS_MODE_ACTIVE, false);
  fgFacebookDistractionBlocker = _utils__WEBPACK_IMPORTED_MODULE_2__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.FACEBOOK_DISTRACTION_BLOCKER, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.facebook);
  fgYouTubeDistractionBlocker = _utils__WEBPACK_IMPORTED_MODULE_2__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_0__.storageNames.YOUTUBE_DISTRACTION_BLOCKER, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.youtube);
};
var jobList = [{
  domains: ['youtube.com'],
  //execute: () => youtubeElementsBlocker(fgFocusModeActive, fgYouTubeDistractionBlocker)
  execute: function execute() {
    return console.log('youtube - executed');
  }
}, {
  domains: ['facebook.com'],
  //execute: () => facebookElementsBlocker(fgFocusModeActive, fgFacebookDistractionBlocker)
  execute: function execute() {
    return console.log('facebook - executed');
  }
}];
var websiteElementsBlockerSetup = function websiteElementsBlockerSetup() {
  readStorage();
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync') {
      if (changes.fgFocusModeActive) {
        fgFocusModeActive = changes.fgFocusModeActive.newValue;
      }
      if (changes.fgFacebookDistractionBlocker) {
        fgFacebookDistractionBlocker = JSON.parse(changes.fgFacebookDistractionBlocker.newValue);
      }
      if (changes.fgYouTubeDistractionBlocker) {
        fgYouTubeDistractionBlocker = JSON.parse(changes.fgYouTubeDistractionBlocker.newValue);
      }
    }
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        jobList.forEach(function (job) {
          console.log('executing job for ' + tab.url + ' on ' + job.domains);
          if (job.domains.some(function (domain) {
            return tab.url.includes(domain);
          })) {
            console.log('mathced domain ' + tab.url + ' on ' + job.domains);
            chrome.scripting.executeScript({
              target: {
                tabId: tab.id
              },
              func: job.execute
            });
          }
        });
      });
    });
  });
};

/***/ }),

/***/ "./src/js/scripts/background/youtubeElementsBlocker.js":
/*!*************************************************************!*\
  !*** ./src/js/scripts/background/youtubeElementsBlocker.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   youtubeElementsBlocker: () => (/* binding */ youtubeElementsBlocker)
/* harmony export */ });
var customImageURL = 'https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
var youtubeElementsBlocker = function youtubeElementsBlocker(active, youtubeElements) {
  var customImageURL = 'https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  // Cover all thumbnails with custom image
  var thumbnailImages = document.querySelectorAll('#thumbnail img');
  for (var i = 0; i < thumbnailImages.length; i++) {
    thumbnailImages[i].src = customImageURL;
  }
  // youtubeElements.forEach(element => {
  //     switch (element) {
  //         case 'youtube-thumbnails': {
  //             // Cover all thumbnails with custom image
  //             let thumbnailImages = document.querySelectorAll('#thumbnail img');
  //             for (let i = 0; i < thumbnailImages.length; i++) {
  //                 thumbnailImages[i].src = customImageURL;
  //             }
  //         }
  //         case 'recommended': {
  //
  //         }
  //     }
  // });
};

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





/***/ }),

/***/ "./src/sass/popup.scss":
/*!*****************************!*\
  !*** ./src/sass/popup.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/options.scss":
/*!*******************************!*\
  !*** ./src/sass/options.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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