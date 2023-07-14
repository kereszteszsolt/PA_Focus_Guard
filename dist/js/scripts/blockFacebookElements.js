/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************************************************************!*\
  !*** ./src/js/scripts/background/website-elements-blocker/blockFacebookElements.js ***!
  \*************************************************************************************/
// content-script-facebook.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'blockFacebookElements') {
    blockFacebookElements(message.pFgFocusModeActive, message.pFgFacebookDistractionBlocker);
  }
});
function blockFacebookElements(pFgFocusModeActive, pFgFacebookDistractionBlocker) {
  console.log('pFgFacebookDistractionBlocker:', pFgFacebookDistractionBlocker);
  // Your logic to block elements on Facebook and perform any additional actions
}
/******/ })()
;