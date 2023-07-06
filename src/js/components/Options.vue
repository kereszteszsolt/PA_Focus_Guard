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
               :class="{ active: selectedComponent === 'YouTubeDistractionBlocker' }">YouTube Distraction Blocker</a></li>
      </ul>
    </div>
    <div class="main">
      <component :is="selectedComponent"
      :storageName=selectedStorageName
      :componentTitle=selectedComponentTitle
      :defaultWebsites=defaultWebsites ></component>
    </div>
  </div>
</template>
<script>
import BlockedWebsitesByDomain from './options/BlockedWebsitesByDomain.vue';
import YouTubeDistractionBlocker from './options/YouTubeDistractionBlocker.vue';

const STORAGE_NAME_TEMPORARILY_BLOCKED_WEBSITES = 'fgTemporarilyBlockedWebsites';
const STORAGE_NAME_PERMANENTLY_BLOCKED_WEBSITES = 'fgPermanentlyBlockedWebsites';
const STORAGE_NAME_YOUTUBE_DISTRACTION_BLOCKER = 'fgYouTubeDistractionBlocker';

const COMPONENT_NAME_TEMPORARILY_BLOCKED_WEBSITES = 'TemporarilyBlockedWebsites';
const COMPONENT_NAME_PERMANENTLY_BLOCKED_WEBSITES = 'PermanentlyBlockedWebsites';
const COMPONENT_NAME_YOUTUBE_DISTRACTION_BLOCKER = 'YouTubeDistractionBlocker';

const COMPONENT_TITLE_TEMPORARILY_BLOCKED_WEBSITES = 'Temporarily Blocked Websites';
const COMPONENT_TITLE_PERMANENTLY_BLOCKED_WEBSITES = 'Permanently Blocked Websites';
const COMPONENT_TITLE_YOUTUBE_DISTRACTION_BLOCKER = 'YouTube Distraction Blocker';

export default {
  data() {
    return {
      selectedComponent: COMPONENT_NAME_TEMPORARILY_BLOCKED_WEBSITES,
      selectedStorageName: STORAGE_NAME_TEMPORARILY_BLOCKED_WEBSITES,
      selectedComponentTitle: COMPONENT_TITLE_TEMPORARILY_BLOCKED_WEBSITES,
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
    YouTubeDistractionBlocker: YouTubeDistractionBlocker
  },
  methods: {
    selectComponent(componentName) {
      this.selectedComponent = componentName;
      switch (componentName) {
        case COMPONENT_NAME_TEMPORARILY_BLOCKED_WEBSITES:
          this.selectedStorageName = STORAGE_NAME_TEMPORARILY_BLOCKED_WEBSITES;
          this.selectedComponentTitle = COMPONENT_TITLE_TEMPORARILY_BLOCKED_WEBSITES;
          this.defaultWebsites = [...this.temporarilyBlockedWebsites];
          break;
        case COMPONENT_NAME_PERMANENTLY_BLOCKED_WEBSITES:
          this.selectedStorageName = STORAGE_NAME_PERMANENTLY_BLOCKED_WEBSITES;
          this.selectedComponentTitle = COMPONENT_TITLE_PERMANENTLY_BLOCKED_WEBSITES;
          this.defaultWebsites = [...this.permanentlyBlockedWebsites];
          break;
        case COMPONENT_NAME_YOUTUBE_DISTRACTION_BLOCKER:
          this.selectedStorageName = STORAGE_NAME_YOUTUBE_DISTRACTION_BLOCKER;
          this.selectedComponentTitle = COMPONENT_TITLE_YOUTUBE_DISTRACTION_BLOCKER;
          this.defaultWebsites = [];
          break;
        default:
          this.selectedStorageName = STORAGE_NAME_TEMPORARILY_BLOCKED_WEBSITES;
          this.selectedComponentTitle = COMPONENT_TITLE_TEMPORARILY_BLOCKED_WEBSITES;
          this.defaultWebsites = [...this.temporarilyBlockedWebsites];
      }
    }
  },
  mounted() {
    const hash = window.location.hash; // Get the hash value from the URL

    switch (hash) {
      case '#temporarily-blocked-sites':
        this.selectedComponent = COMPONENT_NAME_TEMPORARILY_BLOCKED_WEBSITES;
        break;
      case '#permanently-blocked-sites':
        this.selectedComponent = COMPONENT_NAME_PERMANENTLY_BLOCKED_WEBSITES;
        break;
      case '#youtube-distraction-blocker':
        this.selectedComponent = COMPONENT_NAME_YOUTUBE_DISTRACTION_BLOCKER;
        break;
      default:
        this.selectedComponent = COMPONENT_NAME_TEMPORARILY_BLOCKED_WEBSITES;
    }
  }
};
</script>
