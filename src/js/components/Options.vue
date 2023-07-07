<template>
  <header>
    <div class="container">
      <h1>Focus Guard: Options</h1>
    </div>
  </header>
  <div class="container content-box">
    <div class="sidebar">
      <ul>
        <li><a href="#temporarily-blocked-websites" @click="selectComponent('TemporarilyBlockedWebsites')"
               :class="{ active: selectedComponent === 'TemporarilyBlockedWebsites' }">Temporarily Blocked</a></li>
        <li><a href="#permanently-blocked-websites" @click="selectComponent('PermanentlyBlockedWebsites')"
               :class="{ active: selectedComponent === 'PermanentlyBlockedWebsites' }">Permanent Blocked</a></li>
        <li><a href="#you-tube-distraction-blocker" @click="selectComponent('YouTubeDistractionBlocker')"
               :class="{ active: selectedComponent === 'YouTubeDistractionBlocker' }">YouTube Distraction Blocker</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <component :is="selectedComponent"
                 :storageName="selectedStorageName"
                 :componentTitle="selectedComponentTitle"
                 :inputData="selectedData"></component>
    </div>
  </div>
</template>
<script>
import BlockedWebsitesByDomain from './options/BlockedWebsitesByDomain.vue';
import WebsiteElementBlocker from './options/WebsiteElementBlocker.vue';
import * as constants from '../constants';
import * as defaultData from '../data/defaultData';

export default {
  data() {
    return {
      selectedComponent: constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
      selectedStorageName: constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
      selectedComponentTitle: constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
      selectedData: [...defaultData.domains4Temp],
      defaultSelectedData: [...defaultData.domains4Temp]
    };
  },
  components: {
    TemporarilyBlockedWebsites: BlockedWebsitesByDomain,
    PermanentlyBlockedWebsites: BlockedWebsitesByDomain,
    YouTubeDistractionBlocker: WebsiteElementBlocker
  },
  methods: {
    selectComponent(componentName) {
      switch (componentName) {
        case constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES:
          this.setupComponent(constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
              constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
              constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
              [...defaultData.domains4Temp]);
          break;
        case constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES:
          this.setupComponent(constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES,
              constants.storageNames.PERMANENTLY_BLOCKED_WEBSITES,
              constants.componentTitles.PERMANENTLY_BLOCKED_WEBSITES,
              [...defaultData.domains4Perm]);
          break;
        case constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER:
          this.setupComponent(constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER,
              constants.storageNames.YOUTUBE_DISTRACTION_BLOCKER,
              constants.componentTitles.YOUTUBE_DISTRACTION_BLOCKER,
              [...defaultData.youtube]);
          break;
        default:
          this.setupComponent(constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
              constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
              constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
              [...defaultData.domains4Temp]);
      }
    },
    setupComponent(componentName, storageName, componentTitle, defaultData) {
      this.selectedComponent = componentName;
      this.selectedStorageName = storageName;
      this.selectedComponentTitle = componentTitle;
      this.defaultSelectedData = defaultData;
      this.selectedData = this.loadData(storageName, defaultData);
    },
    loadData(storageName, defaultData) {
      const data = localStorage.getItem(this.selectedStorageName);
      let selectedData = [];
      if (data) {
        selectedData = JSON.parse(data);
      } else {
        selectedData = this.defaultSelectedData;
      }
      return selectedData;
    },
    convertHashToPascalCase(hash) {
      // Convert the hash to PascalCase (e.g. #temporarily-blocked-sites -> TemporarilyBlockedSites
      return hash.replace('#', '').replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/\b(\w)/g, c => c.toUpperCase());
    }
  },
  mounted() {
    const hash = window.location.hash; // Get the hash value from the URL
    const modifiedHash = this.convertHashToPascalCase(hash);
    this.selectComponent(modifiedHash);
  }
};
</script>
