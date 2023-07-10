/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!*************************************************************!*\
  !*** ./src/js/scripts/background/youtubeElementsBlocker.js ***!
  \*************************************************************/
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
/******/ })()
;