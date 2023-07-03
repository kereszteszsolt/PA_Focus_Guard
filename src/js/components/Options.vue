<template>
  <header>
    <div class="container">
      <h1>Focus Guard: Options</h1>
    </div>
  </header>
  <div class="container content-box">
    <div class="sidebar">
      <ul>
        <li><a href="#social-media" @click="selectComponent('SocialMedia')"
               :class="{ active: selectedComponent === 'SocialMedia' }">SocialMedia</a></li>
        <li><a href="#blocked-sites" @click="selectComponent('BlockedSites')"
               :class="{ active: selectedComponent === 'BlockedSites' }">BlockedSites</a></li>
      </ul>
    </div>
    <div class="main">
      <component :is="selectedComponent"></component>
    </div>
  </div>
</template>
<script>
import SocialMedia from './options/SocialMedia.vue';
import BlockedSites from './options/BlockedSites.vue';
import Default  from './options/Default.vue';

export default {
  data() {
    return {
      selectedComponent: 'Default'
    };
  },
  components: {
    SocialMedia: SocialMedia,
    BlockedSites: BlockedSites,
    Default: Default
  },
  methods: {
    selectComponent(componentName) {
      this.selectedComponent = componentName;
    }
  },
  mounted() {
    const hash = window.location.hash; // Get the hash value from the URL

    switch (hash) {
      case '#social-media':
        this.selectedComponent = 'SocialMedia';
        break;
      case '#blocked-sites':
        this.selectedComponent = 'BlockedSites';
        break;
      default:
        this.selectedComponent = 'Default';
    }
  }
};
</script>
