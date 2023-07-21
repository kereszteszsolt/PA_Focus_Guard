/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/content-scripts/cotent-scripts-specialized/fgFacebook.js":
/*!*************************************************************************!*\
  !*** ./src/js/content-scripts/cotent-scripts-specialized/fgFacebook.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockFacebookElements: () => (/* binding */ blockFacebookElements)
/* harmony export */ });
var blockFacebookElements = function blockFacebookElements(focusMode, elementRules) {};

/***/ }),

/***/ "./src/js/content-scripts/cotent-scripts-specialized/fgYoutube.js":
/*!************************************************************************!*\
  !*** ./src/js/content-scripts/cotent-scripts-specialized/fgYoutube.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockYouTubeElements: () => (/* binding */ blockYouTubeElements)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/constants */ "./src/js/utils/constants/index.js");

var blockYouTubeElements = function blockYouTubeElements(focusMode, elementRules) {
  console.log("blockYouTubeElements inside fgYouTube.js");
  var timeout = null;
  var delay = 100;
  blockElements(focusMode, elementRules);
  document.addEventListener("scroll", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      blockElements(focusMode, elementRules);
    }, delay);
  });
};
var blockElements = function blockElements(focusMode, elementRules) {
  elementRules.forEach(function (elementRule) {
    if (isActiveRule(focusMode, elementRule)) {
      switch (elementRule.ruleName) {
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_THUMBNAIL:
          replaceYouTubeThumbnail();
          break;
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_VIDEO_TITLE:
          replaceYouTubeVideoTitle();
          break;
        case _utils_constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_CHANNEL_NAME:
          replaceYouTubeChannelName();
          break;
      }
    }
  });
};
var isActiveRule = function isActiveRule(focusMode, elementRule) {
  return elementRule.isMarkedForBlock && (focusMode || elementRule.isPermanentlyBlocked);
};
function replaceYouTubeThumbnail() {
  console.log("Replacing YouTube thumbnail");
  var customImageURL = "https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  var thumbnailImages = document.querySelectorAll("#thumbnail img");
  for (var i = 0; i < thumbnailImages.length; i++) {
    thumbnailImages[i].src = customImageURL;
  }
}
function replaceYouTubeVideoTitle() {
  console.log("Replacing YouTube video title");
  var customTitle = "Focus Guard";
  var videoTitles = document.querySelectorAll("#video-title");
  for (var i = 0; i < videoTitles.length; i++) {
    videoTitles[i].innerHTML = customTitle;
  }

  // let videoPlayerTitle = document.querySelector(
  //   ".style-scope .ytd-watch-metadata h1 yt-formatted-string span",
  // )[0];
  // videoPlayerTitle.innerHTML = customTitle;
}

function replaceYouTubeChannelName() {
  console.log("Replacing YouTube channel name");
  var customChannelName = "Focus Guard";
  var channelNames = document.querySelectorAll("#channel-name");
  for (var i = 0; i < channelNames.length; i++) {
    channelNames[i].innerHTML = customChannelName;
  }
}

/***/ }),

/***/ "./src/js/content-scripts/cotent-scripts-specialized/index.js":
/*!********************************************************************!*\
  !*** ./src/js/content-scripts/cotent-scripts-specialized/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockFacebookElements: () => (/* reexport safe */ _fgFacebook__WEBPACK_IMPORTED_MODULE_1__.blockFacebookElements),
/* harmony export */   blockYouTubeElements: () => (/* reexport safe */ _fgYoutube__WEBPACK_IMPORTED_MODULE_0__.blockYouTubeElements)
/* harmony export */ });
/* harmony import */ var _fgYoutube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fgYoutube */ "./src/js/content-scripts/cotent-scripts-specialized/fgYoutube.js");
/* harmony import */ var _fgFacebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fgFacebook */ "./src/js/content-scripts/cotent-scripts-specialized/fgFacebook.js");



/***/ }),

/***/ "./src/js/utils/constants/blockElementsOnWebActions.js":
/*!*************************************************************!*\
  !*** ./src/js/utils/constants/blockElementsOnWebActions.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLOCK_FACEBOOK_ELEMENTS: () => (/* binding */ BLOCK_FACEBOOK_ELEMENTS),
/* harmony export */   BLOCK_INSTAGRAM_ELEMENTS: () => (/* binding */ BLOCK_INSTAGRAM_ELEMENTS),
/* harmony export */   BLOCK_LINKEDIN_ELEMENTS: () => (/* binding */ BLOCK_LINKEDIN_ELEMENTS),
/* harmony export */   BLOCK_TWITTER_ELEMENTS: () => (/* binding */ BLOCK_TWITTER_ELEMENTS),
/* harmony export */   BLOCK_YOUTUBE_ELEMENTS: () => (/* binding */ BLOCK_YOUTUBE_ELEMENTS)
/* harmony export */ });
var BLOCK_YOUTUBE_ELEMENTS = "blockYoutubeElementsAction";
var BLOCK_FACEBOOK_ELEMENTS = "blockFacebookElementsAction";
var BLOCK_TWITTER_ELEMENTS = "blockTwitterElementsAction";
var BLOCK_LINKEDIN_ELEMENTS = "blockLinkedinElementsAction";
var BLOCK_INSTAGRAM_ELEMENTS = "blockInstagramElementsAction";

/***/ }),

/***/ "./src/js/utils/constants/blockElementsOnWebRuleNames.js":
/*!***************************************************************!*\
  !*** ./src/js/utils/constants/blockElementsOnWebRuleNames.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FACEBOOK_REELS: () => (/* binding */ FACEBOOK_REELS),
/* harmony export */   YOUTUBE_CHANNEL_NAME: () => (/* binding */ YOUTUBE_CHANNEL_NAME),
/* harmony export */   YOUTUBE_THUMBNAIL: () => (/* binding */ YOUTUBE_THUMBNAIL),
/* harmony export */   YOUTUBE_VIDEO_TITLE: () => (/* binding */ YOUTUBE_VIDEO_TITLE)
/* harmony export */ });
var YOUTUBE_THUMBNAIL = "youtube-thumbnail";
var YOUTUBE_VIDEO_TITLE = "youtube-video-title";
var YOUTUBE_CHANNEL_NAME = "youtube-channel-name";
var FACEBOOK_REELS = "facebook-reels";

/***/ }),

/***/ "./src/js/utils/constants/componentNames.js":
/*!**************************************************!*\
  !*** ./src/js/utils/constants/componentNames.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FG_BLOCKED_ELEMENTS_ON_WEBSITES: () => (/* binding */ FG_BLOCKED_ELEMENTS_ON_WEBSITES),
/* harmony export */   FG_BLOCKED_WEBSITES_BY_DOMAIN: () => (/* binding */ FG_BLOCKED_WEBSITES_BY_DOMAIN),
/* harmony export */   FG_BLOCKED_WEBSITES_BY_URL: () => (/* binding */ FG_BLOCKED_WEBSITES_BY_URL)
/* harmony export */ });
var FG_BLOCKED_WEBSITES_BY_DOMAIN = "fgBlockedWebsiteByDomain";
var FG_BLOCKED_WEBSITES_BY_URL = "fgBlockedWebsiteByUrl";
var FG_BLOCKED_ELEMENTS_ON_WEBSITES = "fgBlockedElementsOnWebsites";

/***/ }),

/***/ "./src/js/utils/constants/index.js":
/*!*****************************************!*\
  !*** ./src/js/utils/constants/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockElementsActions: () => (/* reexport module object */ _blockElementsOnWebActions__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   componentNames: () => (/* reexport module object */ _componentNames__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   localStorage: () => (/* reexport module object */ _localStorage__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   ruleNames: () => (/* reexport module object */ _blockElementsOnWebRuleNames__WEBPACK_IMPORTED_MODULE_3__)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/js/utils/constants/localStorage.js");
/* harmony import */ var _componentNames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./componentNames */ "./src/js/utils/constants/componentNames.js");
/* harmony import */ var _blockElementsOnWebActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blockElementsOnWebActions */ "./src/js/utils/constants/blockElementsOnWebActions.js");
/* harmony import */ var _blockElementsOnWebRuleNames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blockElementsOnWebRuleNames */ "./src/js/utils/constants/blockElementsOnWebRuleNames.js");









/***/ }),

/***/ "./src/js/utils/constants/localStorage.js":
/*!************************************************!*\
  !*** ./src/js/utils/constants/localStorage.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FG_ACTIVE: () => (/* binding */ FG_ACTIVE),
/* harmony export */   FG_APP_DATA: () => (/* binding */ FG_APP_DATA),
/* harmony export */   FG_BLOCKED_ELEMENTS_ON_WEBSITES: () => (/* binding */ FG_BLOCKED_ELEMENTS_ON_WEBSITES),
/* harmony export */   FG_BLOCKED_WEBSITES_BY_DOMAIN: () => (/* binding */ FG_BLOCKED_WEBSITES_BY_DOMAIN),
/* harmony export */   FG_BLOCKED_WEBSITES_BY_URL: () => (/* binding */ FG_BLOCKED_WEBSITES_BY_URL)
/* harmony export */ });
var FG_ACTIVE = "fgActive";
var FG_APP_DATA = "fgAppData";
var FG_BLOCKED_WEBSITES_BY_DOMAIN = "fgBlockedWebsitesByDomain";
var FG_BLOCKED_WEBSITES_BY_URL = "fgBlockedWebsitesByUrl";
var FG_BLOCKED_ELEMENTS_ON_WEBSITES = "fgBlockedElementsOnWebsites";

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
/*!*************************************************!*\
  !*** ./src/js/content-scripts/contentScript.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cotent_scripts_specialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cotent-scripts-specialized */ "./src/js/content-scripts/cotent-scripts-specialized/index.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/js/utils/constants/index.js");


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.action) {
    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__.blockElementsActions.BLOCK_YOUTUBE_ELEMENTS:
      console.log("message", message);
      console.log("message.focusMode", message.focusMode);
      console.log("message.elementRules", message.elementRules);
      _cotent_scripts_specialized__WEBPACK_IMPORTED_MODULE_0__.blockYouTubeElements(message.focusMode, message.elementRules);
      break;
    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__.blockElementsActions.BLOCK_FACEBOOK_ELEMENTS:
      _cotent_scripts_specialized__WEBPACK_IMPORTED_MODULE_0__.blockFacebookElements(message.focusMode, message.elementRules);
      break;
  }
  sendResponse();
});
})();

/******/ })()
;