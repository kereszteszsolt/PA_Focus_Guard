/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony export */   loadPrimitiveData: () => (/* binding */ loadPrimitiveData),
/* harmony export */   saveData: () => (/* binding */ saveData),
/* harmony export */   savePrimitiveData: () => (/* binding */ savePrimitiveData)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function loadData(storageName, defaultData) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(storageName, function (data) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        var serializedData = data[storageName];
        if (serializedData) {
          try {
            var parsedData = JSON.parse(serializedData);
            resolve(parsedData);
          } catch (error) {
            reject(new Error("Error parsing data for '".concat(storageName, "': ").concat(error.message)));
          }
        } else {
          resolve(defaultData);
        }
      }
    });
  });
}
function saveData(storageName, data) {
  return new Promise(function (resolve, reject) {
    var serializedData = JSON.stringify(data);
    chrome.storage.sync.set(_defineProperty({}, storageName, serializedData), function () {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}
function loadPrimitiveData(storageName) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(storageName, function (data) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(data[storageName]);
      }
    });
  });
}
function savePrimitiveData(storageName, data) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set(_defineProperty({}, storageName, data), function () {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

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
/*!***************************************!*\
  !*** ./src/js/scripts/utils/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   conversions: () => (/* reexport module object */ _conversions__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   dataAccess: () => (/* reexport module object */ _dataAccess__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _conversions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversions */ "./src/js/scripts/utils/conversions.js");
/* harmony import */ var _dataAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataAccess */ "./src/js/scripts/utils/dataAccess.js");




})();

/******/ })()
;