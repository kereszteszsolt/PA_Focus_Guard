<script>
import BlockByUrl from "./components/BlockByUrl.vue";
import * as config from "../js/config";
import About from "./components/About.vue";
import Language from "./components/Language.vue";
import * as constants from "../js/utils/constants";
import * as dataAccess from "../js/utils/scripts/dataAccess";
import * as lang from "../js/utils/languages";

export default {
  computed: {
    lang() {
      return lang;
    },
    config() {
      return config;
    },
  },
  components: {
    BlockByUrl: BlockByUrl,
    About: About,
    Language: Language,
  },
  data() {
    return {
      selectedFunctionality: config.fgAppFunctionalities[0],
      appFunctionalities: config.fgAppFunctionalities,
      fgAppData: {
        fgActive: false,
        fgLanguage: constants.languages.ENGLISH,
      },
    };
  },
  created() {
    this.loadData();
    if (window.location.hash === "#language") {
      this.selectedFunctionality = config.fgAppFunctionalities.filter(
        (s) => s.funcName === constants.componentNames.FG_LANGUAGE,
      )[0];
      window.location.hash = "";
    }
  },
  methods: {
    selectFunctionality(func) {
      this.selectedFunctionality = func;
    },
    loadData() {
      dataAccess.loadData(constants.localStorage.FG_APP_DATA).then((data) => {
        this.fgAppData = data;
      });
    },
  },
};
</script>

<template>
  <div class="app-bar">
    <div class="container">Focus Guard: Options</div>
  </div>
  <div class="container main">
    <div class="sidebar">
      <ul>
        <li
          v-for="item in config.fgAppFunctionalities"
          v-bind:key="item.funcName"
        >
          <a
            v-bind:class="{
              active: item.funcName === selectedFunctionality.funcName,
            }"
            v-on:click="selectFunctionality(item)"
            >{{ lang.getTranslation(fgAppData.fgLanguage, item.funcName) }}</a
          >
        </li>
      </ul>
    </div>
    <div class="content">
      <component
        :is="selectedFunctionality.containerComponent"
        :funcTitle="selectedFunctionality.funcTitle"
        :funcName="selectedFunctionality.funcName"
        :storageName="selectedFunctionality.storageName"
        :justDomain="selectedFunctionality.justDomain"
        :fgLanguage="fgAppData.fgLanguage"
      ></component>
    </div>
  </div>
</template>

<style lang="scss">
@import "../scss/common.scss";

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
  display: flex;
  flex-direction: column;
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
