/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/background/blockAndRedirect.js":
/*!***********************************************!*\
  !*** ./src/js/background/blockAndRedirect.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockOrAllow: () => (/* binding */ blockOrAllow)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getDynamicRules = function getDynamicRules() {
  return new Promise(function (resolve, reject) {
    chrome.declarativeNetRequest.getDynamicRules(null, function (rules) {
      if (chrome.runtime.lastError) {
        reject(new Error("Error getting dynamic rules: ".concat(chrome.runtime.lastError.message)));
      }
      resolve(rules);
    });
  });
};
var removeDynamicRules = function removeDynamicRules(ruleIds) {
  return new Promise(function (resolve, reject) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds
    }, function () {
      if (chrome.runtime.lastError) {
        reject(new Error("Error removing rules: ".concat(chrome.runtime.lastError.message)));
      }
      resolve();
    });
  });
};
var getAndRemoveOldDynamicRules = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var rules, ruleIds;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getDynamicRules();
        case 2:
          rules = _context.sent;
          ruleIds = rules.map(function (rule) {
            return rule.id;
          });
          console.log("ruleIds", ruleIds);
          _context.next = 7;
          return removeDynamicRules(ruleIds);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAndRemoveOldDynamicRules() {
    return _ref.apply(this, arguments);
  };
}();
var createFGRule = function createFGRule(item, index) {
  return {
    id: index,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        extensionPath: "/html/message.html"
      }
    },
    condition: {
      urlFilter: item.url,
      resourceTypes: ["main_frame", "sub_frame"]
    }
  };
};
var calculateNewDynamicRules = function calculateNewDynamicRules(focusMode, fgBlockedWebsitesByDomain, fgBlockedWebsitesByUrl) {
  return new Promise(function (resolve) {
    var rules = [];
    var index = 1;

    // Combine filtering and mapping for domain and URL rules
    [].concat(_toConsumableArray(fgBlockedWebsitesByDomain), _toConsumableArray(fgBlockedWebsitesByUrl)).forEach(function (item) {
      if (item.isMarkedForBlock && (focusMode || item.isPermanentlyBlocked)) {
        rules.push(createFGRule(item, index++));
      }
    });
    console.log("rules", rules);
    resolve(rules);
  });
};
var applyNewDynamicRules = function applyNewDynamicRules(rules) {
  return new Promise(function (resolve) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules
    }, resolve);
  });
};
var closeBlockedTabs = function closeBlockedTabs(focusMode, fgBlockedWebsitesByDomain, fgBlockedWebsitesByUrl) {
  return new Promise(function (resolve) {
    chrome.tabs.query({}, function (tabs) {
      var blockedItems = [].concat(_toConsumableArray(fgBlockedWebsitesByDomain), _toConsumableArray(fgBlockedWebsitesByUrl)).filter(function (item) {
        return item.isMarkedForBlock && (focusMode || item.isPermanentlyBlocked);
      });
      console.log("blockedItems", blockedItems);
      blockedItems.forEach(function (item) {
        tabs.forEach(function (tab) {
          if (tab.url.includes(item.url)) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
      resolve();
    });
  });
};
var blockOrAllow = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(focusMode, fgBlockedWebsitesByDomain, fgBlockedWebsitesByUrl) {
    var rules;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("blockOrAllow............");
          console.log("focusMode", focusMode);
          console.log("focusMode == true", focusMode == true);
          console.log("focusMode === true", focusMode === true);
          if (focusMode) {
            console.log("focusMode is true");
          }

          // console.log("1.a start block and remove old rules");
          _context2.next = 7;
          return getAndRemoveOldDynamicRules();
        case 7:
          _context2.next = 9;
          return calculateNewDynamicRules(focusMode, fgBlockedWebsitesByDomain, fgBlockedWebsitesByUrl);
        case 9:
          rules = _context2.sent;
          _context2.next = 12;
          return applyNewDynamicRules(rules);
        case 12:
          _context2.next = 14;
          return closeBlockedTabs(focusMode, fgBlockedWebsitesByDomain, fgBlockedWebsitesByUrl);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function blockOrAllow(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/js/background/elementBlockers.js":
/*!**********************************************!*\
  !*** ./src/js/background/elementBlockers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockElements: () => (/* binding */ blockElements)
/* harmony export */ });
var sendMessageToTab = function sendMessageToTab(tabId, focusMode, webSite) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.sendMessage(tabId, {
      action: webSite.action,
      focusMode: focusMode,
      elementRules: webSite.elementRules
    }, function (response) {
      if (chrome.runtime.lastError) {
        reject("Error in sendMessageToTab: " + chrome.runtime.lastError.message);
      } else if (response && response.error) {
        reject("Error in sendMessageToTab: " + response.error);
      } else {
        resolve();
      }
    });
  });
};
var isActiveRule = function isActiveRule(focusMode, elementRule) {
  console.log("isActiveRule called");
  console.log("elementRule", elementRule);
  console.log("focusMode", focusMode);
  console.log("isActiveRule", elementRule.isMarkedForBlock && (focusMode || elementRule.isPermanentlyBlocked));
  return elementRule.isMarkedForBlock && (focusMode || elementRule.isPermanentlyBlocked);
};
var blockElements = function blockElements(focusMode, blockElementsOnWebsitesList) {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({}, function (tabs) {
      if (chrome.runtime.lastError) {
        reject("Error in blockElements: " + chrome.runtime.lastError.message);
      } else {
        var promises = [];
        tabs.forEach(function (tab) {
          blockElementsOnWebsitesList.forEach(function (webSite) {
            if (tab.url.includes(webSite.domain) && webSite.elementRules.filter(function (r) {
              return isActiveRule(focusMode, r);
            }).length > 0) {
              promises.push(sendMessageToTab(tab.id, focusMode, webSite));
            }
          });
        });
        Promise.all(promises).then(function () {
          resolve();
        })["catch"](function (error) {
          reject("Error in blockElements: " + error);
        });
      }
    });
  });
};

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
/* harmony export */   YOUTUBE_ALL_IMAGES: () => (/* binding */ YOUTUBE_ALL_IMAGES),
/* harmony export */   YOUTUBE_CHANNEL_NAME: () => (/* binding */ YOUTUBE_CHANNEL_NAME),
/* harmony export */   YOUTUBE_THUMBNAIL: () => (/* binding */ YOUTUBE_THUMBNAIL),
/* harmony export */   YOUTUBE_VIDEO_TITLE: () => (/* binding */ YOUTUBE_VIDEO_TITLE)
/* harmony export */ });
var YOUTUBE_THUMBNAIL = "youtube-thumbnail";
var YOUTUBE_VIDEO_TITLE = "youtube-video-title";
var YOUTUBE_CHANNEL_NAME = "youtube-channel-name";
var YOUTUBE_ALL_IMAGES = "youtube-all-images";
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

/***/ }),

/***/ "./src/js/utils/defaults/blockByDomain.js":
/*!************************************************!*\
  !*** ./src/js/utils/defaults/blockByDomain.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockByDomainList: () => (/* binding */ blockByDomainList)
/* harmony export */ });
var blockByDomainList = [{
  url: "www.facebook.com",
  isMarkedForBlock: false,
  isPermanentlyBlocked: false
}, {
  url: "www.youtube.com",
  isMarkedForBlock: false,
  isPermanentlyBlocked: false
}, {
  url: "www.twitter.com",
  isMarkedForBlock: false,
  isPermanentlyBlocked: false
}];

/***/ }),

/***/ "./src/js/utils/defaults/blockByUrl.js":
/*!*********************************************!*\
  !*** ./src/js/utils/defaults/blockByUrl.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockByUrlList: () => (/* binding */ blockByUrlList)
/* harmony export */ });
var blockByUrlList = [{
  url: "https://www.facebook.com/reel/",
  isMarkedForBlock: false,
  isPermanentlyBlocked: false
}, {
  url: "https://www.facebook.com/watch/",
  isMarkedForBlock: false,
  isPermanentlyBlocked: false
}];

/***/ }),

/***/ "./src/js/utils/defaults/blockElementsOnWebsites.js":
/*!**********************************************************!*\
  !*** ./src/js/utils/defaults/blockElementsOnWebsites.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockElementsOnWebsitesList: () => (/* binding */ blockElementsOnWebsitesList)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/js/utils/constants/index.js");

var blockElementsOnWebsitesList = [{
  domain: "youtube.com",
  action: _constants__WEBPACK_IMPORTED_MODULE_0__.blockElementsActions.BLOCK_YOUTUBE_ELEMENTS,
  elementRules: [{
    ruleName: _constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_THUMBNAIL,
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }, {
    ruleName: _constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_VIDEO_TITLE,
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }, {
    ruleName: _constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_CHANNEL_NAME,
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }, {
    ruleName: _constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.YOUTUBE_ALL_IMAGES,
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }]
}, {
  domain: "facebook.com",
  action: _constants__WEBPACK_IMPORTED_MODULE_0__.blockElementsActions.BLOCK_FACEBOOK_ELEMENTS,
  elementRules: [{
    ruleName: _constants__WEBPACK_IMPORTED_MODULE_0__.ruleNames.FACEBOOK_REELS,
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }]
}, {
  domain: "instagram.com",
  action: _constants__WEBPACK_IMPORTED_MODULE_0__.blockElementsActions.BLOCK_INSTAGRAM_ELEMENTS,
  elementRules: [{
    ruleName: "instagram-reels",
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }]
}, {
  domain: "twitter.com",
  action: _constants__WEBPACK_IMPORTED_MODULE_0__.blockElementsActions.BLOCK_TWITTER_ELEMENTS,
  elementRules: [{
    ruleName: "twitter-trends",
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }]
}, {
  domain: "linkedin.com",
  action: _constants__WEBPACK_IMPORTED_MODULE_0__.blockElementsActions.BLOCK_LINKEDIN_ELEMENTS,
  elementRules: [{
    ruleName: "linkedin-trends",
    isMarkedForBlock: false,
    isPermanentlyBlocked: false
  }]
}];

/***/ }),

/***/ "./src/js/utils/defaults/index.js":
/*!****************************************!*\
  !*** ./src/js/utils/defaults/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockByDomainList: () => (/* reexport safe */ _blockByDomain__WEBPACK_IMPORTED_MODULE_0__.blockByDomainList),
/* harmony export */   blockByUrlList: () => (/* reexport safe */ _blockByUrl__WEBPACK_IMPORTED_MODULE_1__.blockByUrlList),
/* harmony export */   blockElementsOnWebsitesList: () => (/* reexport safe */ _blockElementsOnWebsites__WEBPACK_IMPORTED_MODULE_2__.blockElementsOnWebsitesList)
/* harmony export */ });
/* harmony import */ var _blockByDomain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blockByDomain */ "./src/js/utils/defaults/blockByDomain.js");
/* harmony import */ var _blockByUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blockByUrl */ "./src/js/utils/defaults/blockByUrl.js");
/* harmony import */ var _blockElementsOnWebsites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blockElementsOnWebsites */ "./src/js/utils/defaults/blockElementsOnWebsites.js");




/***/ }),

/***/ "./src/js/utils/scripts/dataAccess.js":
/*!********************************************!*\
  !*** ./src/js/utils/scripts/dataAccess.js ***!
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
function loadData(storageName) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get([storageName], function (result) {
      if (chrome.runtime.lastError) {
        reject(new Error("Error loading data for '".concat(storageName, "': ").concat(chrome.runtime.lastError.message)));
      } else {
        var serializedData = result[storageName];
        if (serializedData) {
          try {
            var parsedData = JSON.parse(serializedData);
            resolve(parsedData);
          } catch (error) {
            reject(new Error("Error parsing data for '".concat(storageName, "': ").concat(error.message)));
          }
        } else {
          resolve([]); // Return an empty array if no data found for the specified storageName
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
        reject(new Error("Error saving data for '".concat(storageName, "': ").concat(chrome.runtime.lastError.message)));
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
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/constants */ "./src/js/utils/constants/index.js");
/* harmony import */ var _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/scripts/dataAccess.js */ "./src/js/utils/scripts/dataAccess.js");
/* harmony import */ var _utils_defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/defaults */ "./src/js/utils/defaults/index.js");
/* harmony import */ var _background_blockAndRedirect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./background/blockAndRedirect */ "./src/js/background/blockAndRedirect.js");
/* harmony import */ var _background_elementBlockers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./background/elementBlockers */ "./src/js/background/elementBlockers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






//load default values when extension is loaded
var fgAppData = {
  focusMode: false
};
var fgBlockedWebsitesByDomain = [];
var fgBlockedWebsitesByUrl = [];
var fgBlockedElementsOnWebsites = [];

//when installed, set default values
chrome.runtime.onInstalled.addListener( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return setDefaultValues();
      case 2:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
function setDefaultValues() {
  return _setDefaultValues.apply(this, arguments);
}
function _setDefaultValues() {
  _setDefaultValues = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.saveData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_APP_DATA, fgAppData);
        case 3:
          _context3.next = 5;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.saveData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN, _utils_defaults__WEBPACK_IMPORTED_MODULE_2__.blockByDomainList);
        case 5:
          _context3.next = 7;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.saveData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_URL, _utils_defaults__WEBPACK_IMPORTED_MODULE_2__.blockByUrlList);
        case 7:
          _context3.next = 9;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.saveData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES, _utils_defaults__WEBPACK_IMPORTED_MODULE_2__.blockElementsOnWebsitesList);
        case 9:
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error("Error setting default values:", _context3.t0);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return _setDefaultValues.apply(this, arguments);
}
function readData() {
  return _readData.apply(this, arguments);
} // any time a storage item is updated, update global variables and run block_or_allow
function _readData() {
  _readData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var xfgActive, xfgBlockedWebsitesByDomain, xfgBlockedWebsitesByUrl, xfgBlockedElementsOnWebsites;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.loadData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_ACTIVE);
        case 3:
          xfgActive = _context4.sent;
          _context4.next = 6;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.loadData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN);
        case 6:
          xfgBlockedWebsitesByDomain = _context4.sent;
          _context4.next = 9;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.loadData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_URL);
        case 9:
          xfgBlockedWebsitesByUrl = _context4.sent;
          _context4.next = 12;
          return _utils_scripts_dataAccess_js__WEBPACK_IMPORTED_MODULE_1__.loadData(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES);
        case 12:
          xfgBlockedElementsOnWebsites = _context4.sent;
          console.log("fgActive", xfgActive);
          console.log("fgBlockedWebsitesByDomain", xfgBlockedWebsitesByDomain);
          console.log("fgBlockedWebsitesByUrl", xfgBlockedWebsitesByUrl);
          console.log("fgBlockedElementsOnWebsites", xfgBlockedElementsOnWebsites);
          _context4.next = 22;
          break;
        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          console.error("Error reading data:", _context4.t0);
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 19]]);
  }));
  return _readData.apply(this, arguments);
}
chrome.storage.onChanged.addListener( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(changes, namespace) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(namespace === "sync")) {
            _context2.next = 9;
            break;
          }
          if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_APP_DATA in changes) {
            fgAppData = JSON.parse(changes[_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_APP_DATA].newValue);
            console.log("fired: fgAppData", fgAppData);
          }
          if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN in changes) {
            fgBlockedWebsitesByDomain = JSON.parse(changes[_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN].newValue);
          }
          if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_URL in changes) {
            fgBlockedWebsitesByUrl = JSON.parse(changes[_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_WEBSITES_BY_URL].newValue);
          }
          if (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES in changes) {
            fgBlockedElementsOnWebsites = JSON.parse(changes[_utils_constants__WEBPACK_IMPORTED_MODULE_0__.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES].newValue);
          }
          _context2.next = 7;
          return (0,_background_blockAndRedirect__WEBPACK_IMPORTED_MODULE_3__.blockOrAllow)(fgAppData.focusMode, fgBlockedWebsitesByDomain, fgBlockedWebsitesByUrl);
        case 7:
          _context2.next = 9;
          return (0,_background_elementBlockers__WEBPACK_IMPORTED_MODULE_4__.blockElements)(fgAppData.focusMode, fgBlockedElementsOnWebsites);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
})();

/******/ })()
;