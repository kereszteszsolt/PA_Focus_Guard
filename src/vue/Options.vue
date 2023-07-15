<script>
import BlockByUrl from './components/BlockByUrl.vue';
import * as config from '../js/config';

export default {
  computed: {
    config() {
      return config;
    }
  },
  components: {
    BlockByUrl: BlockByUrl
  },
  data() {
    return {
      selectedFunctionality: config.fgAppFunctionalities[0],
      selectedData: []
    };
  },
  created() {
    this.loadFunctionality();
  },
  methods: {
    loadFunctionality: function () {

    }
  }
};
</script>

<template>
  <div class="app-bar">
    <div class="container">Focus Guard: Options</div>
  </div>
  <div class="container main">
    <div class="sidebar">
      <ul>
        <li v-for="func in config.fgAppFunctionalities"
            v-bind:key="func.funcName">
          <a v-bind:class="{ active: func.funcName === selectedFunctionality.funcName }"
             v-on:click="selectedFunctionality = func">{{ func.funcTitle }}</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <component :is="selectedFunctionality.containerComponent"
                 :funcTitle="selectedFunctionality.funcTitle"
                 :funcName="selectedFunctionality.funcName"
                 :storageName="selectedFunctionality.storageName"
                 :data="selectedData"></component>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/common.scss';

.app-bar {
  display: flex;
  flex-direction: column;
  background-color: $fg-primary-color;
  color: floralwhite;
  font-weight: bold;
  align-items: center;
  padding: 0.5rem;
  font-size: 3rem;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
}

.content {
  flex: 1; /* Allow the main content to take up the remaining space */
  background-color: floralwhite;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.2);
  padding: 1rem;
  border-radius: 5px;
}

.sidebar {
  flex: 0 0 200px;
  background-color: floralwhite;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.2);
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  //background-color: #f9f5ed;
  //padding: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        display: block;
        padding: 8px 12px;
        border-radius: 4px;
        color: #333;
        text-decoration: none;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #e0e0e0;
        }

        &.active {
          background-color: $fg-primary-color;
          color: #fff;
        }
      }
    }
  }
}
</style>
