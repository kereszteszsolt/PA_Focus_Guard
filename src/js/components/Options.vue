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
          <a :href="convertPascalCaseToHash(component.name)"
             @click="selectComponent(component.name)"
             :class="{ active: selectedComponent.name === component.name }"
          >{{ component.title }}</a>
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
    selectComponent(componentName) {
      this.selectedComponent = defaultComponents.find(component => component.name === componentName);
      if (!this.selectedComponent) {
        this.selectedComponent = defaultComponents[0];
      }
      this.selectedComponent.data = this.loadData(this.selectedComponent.storageName, this.selectedComponent.defaultData);
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
    },
    convertPascalCaseToHash(pascalCase) {
      const dashedString = pascalCase
          .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert a dash before each uppercase letter
          .toLowerCase(); // Convert the string to lowercase
      return `#${dashedString}`;
    }
  },
  mounted() {
    const hash = window.location.hash; // Get the hash value from the URL
    const modifiedHash = this.convertHashToPascalCase(hash);
    this.selectComponent(modifiedHash);
  }
};
</script>
