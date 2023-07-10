<template>
  <div class="wrapper">
    <h1 class="title">Focus Guard</h1>
    <hr/>
    <div class="buttons">
      <button type="button" class="state-off" :class="{'is-active': !fgFocusModeActive}" @click="setActive(false)">Off</button>
      <button type="button" class="state-on" :class="{'is-active': fgFocusModeActive}" @click="setActive(true)">On</button>
    </div>
    <button type="button" class="state-save" @click="settings">Settings</button>
    <button type="button" class="state-save" @click="details">Details</button>
  </div>
</template>
<script>
import * as constants from '../constants';
import * as utils from '../scripts/utils';
export default {

  data() {
    return {
      fgFocusModeActive: false
    };
  },
  created() {
    this.fgFocusModeActive = utils.dataAccess.loadData(constants.storageNames.FOCUS_MODE_ACTIVE, false);
  },
  methods: {
    setActive(active) {
      this.fgFocusModeActive = active;
      utils.dataAccess.saveData(constants.storageNames.FOCUS_MODE_ACTIVE, active);
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
