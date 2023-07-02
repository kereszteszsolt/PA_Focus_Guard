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
import SocialMedia from './SocialMedia.vue';
import BlockedSites from './BlockedSites.vue';
import Default  from './Default.vue';

export default {
  data() {
    return {
      selectedComponent: ''
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

    if (hash === '#social-media') {
      this.selectedComponent = 'SocialMedia';
    } else if (hash === '#blocked-sites') {
      this.selectedComponent = 'BlockedSites';
    } else {
      this.selectedComponent = 'Default';
    }
  }
};
</script>
