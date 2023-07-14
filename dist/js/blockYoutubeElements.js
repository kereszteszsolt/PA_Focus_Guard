/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************************************************!*\
  !*** ./src/js/scripts/background/website-elements-blocker/blockYoutubeElements.js ***!
  \************************************************************************************/
// content-script-youtube.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'blockYoutubeElements') {
    blockYoutubeElements(message.pFgFocusModeActive, message.pFgYouTubeDistractionBlocker);
  }
});
function blockYoutubeElements(pFgFocusModeActive, pFgYouTubeDistractionBlocker) {
  console.log('pFgYouTubeDistractionBlocker:', pFgYouTubeDistractionBlocker);
  // Your logic to block elements on YouTube and perform any additional actions
}
/******/ })()
;