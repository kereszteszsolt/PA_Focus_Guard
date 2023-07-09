<template>
  <header>
    <div class="container">
      <h1>Focus Guard: Options</h1>
    </div>
  </header>
  <div class="container content-box">
    <div class="sidebar">
      <ul>
        <li v-for="(component, index) in defaultComponents()" :key="index">
          <a :href="convertToHash(component.name)"
             @click="selectComponent(component.name)"
             :class="{ active: selectedComponent.name === component.name }"
          >{{ component.title }}</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <component :is="selectedComponent.containerComponent"
                 :name="selectedComponent.name"
                 :title="selectedComponent.title"
                 :storageName="selectedComponent.storageName"
                 :containerComponent="selectedComponent.containerComponent"
                 :data="selectedComponent.data"
                 :defaultData="selectedComponent.defaultData"></component>
    </div>
  </div>
</template>
<script>
import BlockedWebsitesByDomain from './options/BlockedWebsitesByDomain.vue';
import WebsiteElementBlocker from './options/WebsiteElementBlocker.vue';
import {defaultComponents} from '../defaults/defaultComponents';
import * as utils from '../scripts/utils';


export default {
  data() {
    return {
      selectedComponent: defaultComponents[0]
    };
  },
  components: {
    BlockedWebsitesByDomain: BlockedWebsitesByDomain,
    WebsiteElementBlocker: WebsiteElementBlocker
  },
  methods: {
    defaultComponents() {
      return defaultComponents;
    },
    convertToHash(componentName) {
      return utils.conversions.convertPascalCaseToHash(componentName);
    },
    selectComponent(componentName) {
      this.selectedComponent = defaultComponents.find(component => component.name === componentName);
      if (!this.selectedComponent) {
        this.selectedComponent = defaultComponents[0];
      }
      this.selectedComponent.data = utils.dataAccess.loadData(this.selectedComponent.storageName, this.selectedComponent.defaultData);
    }
  },
  mounted() {
    const hash = window.location.hash; // Get the hash value from the URL
    const modifiedHash = utils.conversions.convertHashToPascalCase(hash);
    this.selectComponent(modifiedHash);
  }
};
</script>
