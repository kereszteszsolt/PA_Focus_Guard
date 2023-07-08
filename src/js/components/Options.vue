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
               :class="{ active: selectedComponent.name === 'TemporarilyBlockedWebsites' }">Temporarily Blocked</a></li>
        <li><a href="#permanently-blocked-websites" @click="selectComponent('PermanentlyBlockedWebsites')"
               :class="{ active: selectedComponent.name === 'PermanentlyBlockedWebsites' }">Permanent Blocked</a></li>
        <li><a href="#you-tube-distraction-blocker" @click="selectComponent('YouTubeDistractionBlocker')"
               :class="{ active: selectedComponent.name === 'YouTubeDistractionBlocker' }">YouTube Distraction Blocker</a>
          <li><a href="#facebook-distraction-blocker" @click="selectComponent('FacebookDistractionBlocker')">Facebook
            Distraction Blocker</a></li>
        </li>
      </ul>
    </div>
    <div class="main">
      <component :is="selectedComponent.containerComponent"
                 :storageName="selectedComponent.storageName"
                 :componentTitle="selectedComponent.title"
                 :inputData="selectedComponent.data"></component>
    </div>
  </div>
</template>
<script>
import BlockedWebsitesByDomain from './options/BlockedWebsitesByDomain.vue';
import WebsiteElementBlocker from './options/WebsiteElementBlocker.vue';
import * as constants from '../constants';
import * as defaultData from '../data/defaultData';
import {defaultComponents} from '../data/defaultComponents';

const BLOCKED_WEBSITES_BY_DOMAIN = 'BlockedWebsitesByDomain';
const WEBSITE_ELEMENT_BLOCKER = 'WebsiteElementBlocker';

export default {
  data() {
    return {
      selectedComponent: {
        name: constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
        title: constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
        storageName: constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
        data: [...defaultData.domains4Temp],
        defaultData: [...defaultData.domains4Temp],
        containerComponent: BLOCKED_WEBSITES_BY_DOMAIN
      }
    };
  },
  components: {
    BlockedWebsitesByDomain: BlockedWebsitesByDomain,
    WebsiteElementBlocker: WebsiteElementBlocker
  },
  methods: {
    selectComponent(componentName) {
      switch (componentName) {
        case constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES:
          this.setupComponent(constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
              [...defaultData.domains4Temp]);
          break;
        case constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES:
          this.setupComponent(constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES,
              [...defaultData.domains4Perm]);
          break;
        case constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER:
          this.setupComponent(constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER,
              [...defaultData.youtube]);
          break;
        case constants.componentNames.FACEBOOK_DISTRACTION_BLOCKER:
          this.setupComponent(constants.componentNames.FACEBOOK_DISTRACTION_BLOCKER,
              [...defaultData.facebook]);
          break;
        default:
          this.setupComponent(constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
              [...defaultData.domains4Temp]);
      }
    },
    setupComponent(componentName, defaultData) {
      this.selectedComponent = defaultComponents.find(component => component.name === componentName);
      if(!this.selectedComponent) {
        this.selectedComponent = defaultComponents[0];
      }
        this.selectedComponent.data = this.loadData(this.selectedComponent.storageName, defaultData);
        this.selectedComponent.defaultData = defaultData;
    },
    loadData(storageName, defaultData) {
      const data = localStorage.getItem(storageName);
      let selectedData = [];
      if (data) {
        selectedData = JSON.parse(data);
      } else {
        selectedData = defaultData;
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
