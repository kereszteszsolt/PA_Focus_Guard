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
export default {
  data() {
    return {
      active: false,
    };
  },
  created() {
    chrome.storage.sync.get(['fbBlockedSitesActive'], (result) => {
      this.active = result.fbBlockedSitesActive;
    });
  },
  methods: {
    setActive(active) {
      this.active = active;
      chrome.storage.sync.set({
        fbBlockedSitesActive: active
      }, () => {
      });

    },
    settings() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html#blocked-sites'));
      }
    },
    details() {
      chrome.tabs.create({url: 'chrome://extensions/?id=' + chrome.runtime.id});
    }
  }
};
</script>
