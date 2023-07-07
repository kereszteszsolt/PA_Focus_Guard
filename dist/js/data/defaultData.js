/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/json/defaultsForFacebook.json":
/*!*******************************************!*\
  !*** ./src/json/defaultsForFacebook.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"name":"Facebook - Reels","actionDescription":"Remove a Reel","action":"remove","activeRule":false,"permanently":false}]');

/***/ }),

/***/ "./src/json/defaultsForYoutube.json":
/*!******************************************!*\
  !*** ./src/json/defaultsForYoutube.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"name":"YouTube Video: Thumbnails","actionDescription":"Replace","action":"replace","activeRule":false,"permanently":false},{"name":"YouTube Video: Titles","actionDescription":"Replace - but keep the original title in tooltip","action":"replace","activeRule":false,"permanently":false},{"name":"YouTube Video: Descriptions","actionDescription":"Replace/Remove","action":"replace","activeRule":false,"permanently":false},{"name":"YouTube Video: Channel names","actionDescription":"Replace - but keep the original title in tooltip","action":"replace","activeRule":false,"permanently":false}]');

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
/* harmony export */   defaultData: () => (/* binding */ defaultData)
/* harmony export */ });
/* harmony import */ var _json_defaultsForFacebook_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../json/defaultsForFacebook.json */ "./src/json/defaultsForFacebook.json");
/* harmony import */ var _json_defaultsForYoutube_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../json/defaultsForYoutube.json */ "./src/json/defaultsForYoutube.json");


var defaultData = {
  facebook: _json_defaultsForFacebook_json__WEBPACK_IMPORTED_MODULE_0__,
  youtube: _json_defaultsForYoutube_json__WEBPACK_IMPORTED_MODULE_1__
};
})();

/******/ })()
;