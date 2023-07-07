<template>
  <header>
    <div class="container">
      <h1>Focus Guard: Options</h1>
    </div>
  </header>
  <div class="container content-box">
    <div class="sidebar">
      <ul>
        <li><a href="#temporarily-blocked-sites" @click="selectComponent('TemporarilyBlockedWebsites')"
               :class="{ active: selectedComponent === 'TemporarilyBlockedWebsites' }">Temporarily Blocked</a></li>
        <li><a href="#permanently-blocked-sites" @click="selectComponent('PermanentlyBlockedWebsites')"
               :class="{ active: selectedComponent === 'PermanentlyBlockedWebsites' }">Permanent Blocked</a></li>
        <li><a href="#youtube-distraction-blocker" @click="selectComponent('YouTubeDistractionBlocker')"
               :class="{ active: selectedComponent === 'YouTubeDistractionBlocker' }">YouTube Distraction Blocker</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <component :is="selectedComponent"
                 :storageName=selectedStorageName
                 :componentTitle=selectedComponentTitle
                 :defaultWebsites=defaultWebsites></component>
    </div>
  </div>
</template>
<script>
import BlockedWebsitesByDomain from './options/BlockedWebsitesByDomain.vue';
import WebsiteElementBlocker from './options/WebsiteElementBlocker.vue';
import * as constants from '../constants';
import {defaultData} from '../data/defaultData';

export default {
  data() {
    return {
      selectedComponent: constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
      selectedStorageName: constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
      selectedComponentTitle: constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
      temporarilyBlockedWebsites: [
        {
          name: 'facebook.com',
          checked: true
        },
        {
          name: 'twitter.com',
          checked: true
        },
        {
          name: 'youtube.com',
          checked: true
        }
      ],
      permanentlyBlockedWebsites: [
        {
          name: 'instagram.com',
          checked: true
        },
        {
          name: 'reddit.com',
          checked: true
        },
        {
          name: 'tumblr.com',
          checked: true
        }
      ],
      defaultWebsites: [
        {
          name: 'example.com',
          checked: true
        }
      ]
    };
  },
  components: {
    TemporarilyBlockedWebsites: BlockedWebsitesByDomain,
    PermanentlyBlockedWebsites: BlockedWebsitesByDomain,
    YouTubeDistractionBlocker: WebsiteElementBlocker
  },
  methods: {
    selectComponent(componentName) {
      this.selectedComponent = componentName;
      switch (componentName) {
        case constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES:
          this.selectedStorageName = constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES;
          this.selectedComponentTitle = constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES;
          this.defaultWebsites = [...this.temporarilyBlockedWebsites];
          break;
        case constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES:
          this.selectedStorageName = constants.storageNames.PERMANENTLY_BLOCKED_WEBSITES;
          this.selectedComponentTitle = constants.componentTitles.PERMANENTLY_BLOCKED_WEBSITES;
          this.defaultWebsites = [...this.permanentlyBlockedWebsites];
          break;
        case constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER:
          this.selectedStorageName = constants.storageNames.YOUTUBE_DISTRACTION_BLOCKER;
          this.selectedComponentTitle = constants.componentTitles.YOUTUBE_DISTRACTION_BLOCKER;
          this.defaultWebsites = [...defaultData.youtube];
          break;
        default:
          this.selectedStorageName = constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES;
          this.selectedComponentTitle = constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES;
          this.defaultWebsites = [...this.temporarilyBlockedWebsites];
      }
    }
  },
  mounted() {
    const hash = window.location.hash; // Get the hash value from the URL

    switch (hash) {
      case '#temporarily-blocked-sites':
        this.selectedComponent = constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES;
        break;
      case '#permanently-blocked-sites':
        this.selectedComponent = constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES;
        break;
      case '#youtube-distraction-blocker':
        this.selectedComponent = constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER;
        break;
      default:
        this.selectedComponent = constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES;
    }
  }
};
</script>
