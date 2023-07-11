<template>
  <div class="wrapper">
    <h1 class="title">Focus Guard</h1>
    <hr/>
    <div class="buttons">
      <button type="button" class="state-off" :class="{'is-active': !active}" @click="setActive(false)">Off</button>
      <button type="button" class="state-on" :class="{'is-active': active}" @click="setActive(true)">On</button>
    </div>
    <button type="button" class="state-save" @click="settings">Settings</button>
    <button type="button" class="state-save" @click="details">Details</button>
  </div>
</template>
<script>
import * as utils from '../scripts/utils';
import * as constants from '../constants';

export default {
  data() {
    return {
      active: false
    };
  },
  created() {
    // chrome.storage.sync.get(['fgFocusModeActive'], (result) => {
    //   this.active = result.fgFocusModeActive;
    // });
    this.active = utils.dataAccess.loadPrimitiveData(constants.storageNames.FG_FOCUS_MODE_ACTIVE);
  },
  methods: {
    setActive(pActive) {
       this.active = pActive;
      // chrome.storage.sync.set({
      //   fgFocusModeActive: active
      // }, () => {
      // });
      utils.dataAccess.savePrimitiveData(constants.storageNames.FG_FOCUS_MODE_ACTIVE, this.active);
    },
    settings() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html#temporarily-blocked-sites'));
      }
    },
    details() {
      chrome.tabs.create({url: 'chrome://extensions/?id=' + chrome.runtime.id});
    }
  }
};
</script>
