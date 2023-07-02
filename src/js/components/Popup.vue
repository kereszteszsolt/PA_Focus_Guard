<template>
  <div class="wrapper">
    <h1 class="title">Simple Toggle Sites</h1>
    <div class="buttons">
      <button type="button" class="state-off" :class="{'is-active': !active}" @click="setActive(false)">Off</button>
      <button type="button" class="state-on" :class="{'is-active': active}" @click="setActive(true)">On</button>
    </div>
    <div class="sites">
      <p>List your websites below, one per line</p>
      <textarea rows="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                v-model="list"></textarea>
    </div>
    <button type="button" class="state-save" @click="saveList">Save Site List</button>
    <button type="button" class="state-save" @click="settings">Settings</button>
    <button type="button" class="state-save" @click="details">Details</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: true,
      list: 'example.com'
    };
  },
  created() {
    chrome.storage.sync.get(['toggleSitesActive', 'toggleSitesList'], (result) => {
      this.active = result.toggleSitesActive;
      this.list = result.toggleSitesList;
    });
  },
  methods: {
    setActive(active) {
      this.active = active;
      chrome.storage.sync.set({
        toggleSitesActive: active
      }, () => {
      });

    },
    saveList() {
      chrome.storage.sync.set({
        toggleSitesList: this.list
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
