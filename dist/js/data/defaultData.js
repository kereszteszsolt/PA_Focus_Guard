/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/data/defaultDomainsForPermanentlyBlock.js":
/*!**********************************************************!*\
  !*** ./src/js/data/defaultDomainsForPermanentlyBlock.js ***!
  \**********************************************************/
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

/***/ "./src/js/data/defaultDomainsForTemporarilyBlock.js":
/*!**********************************************************!*\
  !*** ./src/js/data/defaultDomainsForTemporarilyBlock.js ***!
  \**********************************************************/
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

/***/ "./src/js/data/defaultsForFacebook.js":
/*!********************************************!*\
  !*** ./src/js/data/defaultsForFacebook.js ***!
  \********************************************/
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

/***/ "./src/js/data/defaultsForYoutube.js":
/*!*******************************************!*\
  !*** ./src/js/data/defaultsForYoutube.js ***!
  \*******************************************/
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
/*!************************************!*\
  !*** ./src/js/data/defaultData.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   domains4Perm: () => (/* reexport safe */ _defaultDomainsForPermanentlyBlock__WEBPACK_IMPORTED_MODULE_3__.domains4Perm),
/* harmony export */   domains4Temp: () => (/* reexport safe */ _defaultDomainsForTemporarilyBlock__WEBPACK_IMPORTED_MODULE_2__.domains4Temp),
/* harmony export */   facebook: () => (/* reexport safe */ _defaultsForFacebook__WEBPACK_IMPORTED_MODULE_1__.facebook),
/* harmony export */   youtube: () => (/* reexport safe */ _defaultsForYoutube__WEBPACK_IMPORTED_MODULE_0__.youtube)
/* harmony export */ });
/* harmony import */ var _defaultsForYoutube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultsForYoutube */ "./src/js/data/defaultsForYoutube.js");
/* harmony import */ var _defaultsForFacebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultsForFacebook */ "./src/js/data/defaultsForFacebook.js");
/* harmony import */ var _defaultDomainsForTemporarilyBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultDomainsForTemporarilyBlock */ "./src/js/data/defaultDomainsForTemporarilyBlock.js");
/* harmony import */ var _defaultDomainsForPermanentlyBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultDomainsForPermanentlyBlock */ "./src/js/data/defaultDomainsForPermanentlyBlock.js");




})();

/******/ })()
;