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
/* harmony import */ var _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults/defaultData */ "./src/js/defaults/defaultData.js");
/* harmony import */ var _defaults_defaultComponents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults/defaultComponents */ "./src/js/defaults/defaultComponents.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/js/constants/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
  _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.savePrimitiveData(_constants__WEBPACK_IMPORTED_MODULE_3__.storageNames.FG_FOCUS_MODE_ACTIVE);
  //  chrome.storage.sync.set({
  //          fgFocusModeActive: false
  //      }, () => {
  //      });
  _defaults_defaultComponents__WEBPACK_IMPORTED_MODULE_2__.defaultComponents.forEach(function (component) {
    _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.saveData(component.storageName, component.defaultData);
  });
});

// set up initial chrome storage values
var fgFocusModeActive = false;
var fgTemporarilyBlockedWebsites = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.domains4Temp;
var fgPermanentlyBlockedWebsites = _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.domains4Perm;
var readStorage = function readStorage() {
  fgFocusModeActive = _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadPrimitiveData(_constants__WEBPACK_IMPORTED_MODULE_3__.storageNames.FG_FOCUS_MODE_ACTIVE);
  //  chrome.storage.sync.get(['fgFocusModeActive'], (result) => {
  //      fgFocusModeActive = result.fgFocusModeActive;});
  fgTemporarilyBlockedWebsites = _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_3__.storageNames.TEMPORARILY_BLOCKED_WEBSITES, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.domains4Temp);
  fgPermanentlyBlockedWebsites = _scripts_utils__WEBPACK_IMPORTED_MODULE_0__.dataAccess.loadData(_constants__WEBPACK_IMPORTED_MODULE_3__.storageNames.PERMANENTLY_BLOCKED_WEBSITES, _defaults_defaultData__WEBPACK_IMPORTED_MODULE_1__.domains4Perm);
};
readStorage();
var getAndRemoveOldDynamicRules = function getAndRemoveOldDynamicRules() {
  return new Promise(function (resolve) {
    chrome.declarativeNetRequest.getDynamicRules(null, function (oldRules) {
      var ruleIds = oldRules.map(function (rule) {
        return rule.id;
      });
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds
      }, resolve);
    });
  });
};
var createFGRule = function createFGRule(siteName, index) {
  return {
    id: index,
    priority: 1,
    action: {
      type: 'redirect',
      redirect: {
        extensionPath: '/message.html'
      }
    },
    condition: {
      urlFilter: siteName,
      resourceTypes: ['main_frame', 'sub_frame']
    }
  };
};
var calculateNewDynamicRules = function calculateNewDynamicRules() {
  console.log('calculateNewDynamicRules');
  var rules = [];
  var rulesIndex = 1;
  if (fgFocusModeActive === true) {
    var tempRules = fgTemporarilyBlockedWebsites.filter(function (site) {
      return site.checked;
    }).map(function (site) {
      return createFGRule(site.name, rulesIndex++);
    });
    rules.push.apply(rules, _toConsumableArray(tempRules));
  }
  var permRules = fgPermanentlyBlockedWebsites.filter(function (site) {
    return site.checked;
  }).map(function (site) {
    return createFGRule(site.name, rulesIndex++);
  });
  rules.push.apply(rules, _toConsumableArray(permRules));
  return rules;
};
var applyNewDynamicRules = function applyNewDynamicRules(rules) {
  return new Promise(function (resolve) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules
    }, resolve);
  });
};
var blockOrAllow = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var newRules;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('blockOrAllow');
          console.log('fgFocusModeActive', fgFocusModeActive);
          _context.next = 4;
          return getAndRemoveOldDynamicRules();
        case 4:
          newRules = calculateNewDynamicRules();
          _context.next = 7;
          return applyNewDynamicRules(newRules);
        case 7:
          chrome.declarativeNetRequest.getDynamicRules(null, function (myRules) {
            console.log('new rules: ', myRules);
          });
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function blockOrAllow() {
    return _ref.apply(this, arguments);
  };
}();

// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync') {
    if (changes.fgFocusModeActive) {
      fgFocusModeActive = changes.fgFocusModeActive.newValue;
    }
    if (changes.fgTemporarilyBlockedWebsites) {
      fgTemporarilyBlockedWebsites = JSON.parse(changes.fgTemporarilyBlockedWebsites.newValue);
    }
    if (changes.fgPermanentlyBlockedWebsites) {
      fgPermanentlyBlockedWebsites = JSON.parse(changes.fgPermanentlyBlockedWebsites.newValue);
    }
    blockOrAllow();
    chrome.tabs.query({}, function (tabs) {
      // loop through all tabs and close any that are on the blocked list
      tabs.forEach(function (tab) {
        if (fgFocusModeActive === true) {
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
/* harmony export */   FG_FOCUS_MODE_ACTIVE: () => (/* binding */ FG_FOCUS_MODE_ACTIVE),
/* harmony export */   PERMANENTLY_BLOCKED_WEBSITES: () => (/* binding */ PERMANENTLY_BLOCKED_WEBSITES),
/* harmony export */   TEMPORARILY_BLOCKED_WEBSITES: () => (/* binding */ TEMPORARILY_BLOCKED_WEBSITES),
/* harmony export */   YOUTUBE_DISTRACTION_BLOCKER: () => (/* binding */ YOUTUBE_DISTRACTION_BLOCKER)
/* harmony export */ });
var FG_FOCUS_MODE_ACTIVE = 'fgFocusModeActive';
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
/* harmony export */   loadPrimitiveData: () => (/* binding */ loadPrimitiveData),
/* harmony export */   saveData: () => (/* binding */ saveData),
/* harmony export */   savePrimitiveData: () => (/* binding */ savePrimitiveData)
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
function loadPrimitiveData(storageName) {
  return chrome.storage.sync.get(storageName, function () {});
}
function savePrimitiveData(storageName, data) {
  chrome.storage.sync.set(_defineProperty({}, storageName, data), function () {});
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