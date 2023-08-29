<script>
import * as dataAccess from "../../js/utils/scripts/dataAccess";
import * as constants from "../../js/utils/constants";
import * as lang from "../../js/utils/languages";

export default {
  computed: {
    lang() {
      return lang;
    },
    constants() {
      return constants;
    },
  },
  props: {
    funcTitle: {
      type: String,
      required: true,
    },
    funcName: {
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true,
    },
    justDomain: {
      type: Boolean,
      required: true,
    },
    fgLanguage: {
      type: String,
      required: true,
    },
  },
  methods: {
    saveData(value) {
      dataAccess
        .saveData(constants.localStorage.FG_APP_DATA, {
          ...this.appData,
          fgLanguage: value,
        })
        .then(() => {
          window.location.href = "/html/options.html#language";
          window.location.reload();
        });
    },
    loadData() {
      dataAccess.loadData(constants.localStorage.FG_APP_DATA).then((data) => {
        this.appData = data;
      });
    },
  },
  data() {
    return {
      appData: {
        fgActive: false,
        fgLanguage: constants.languages.ENGLISH,
      },
    };
  },
  created() {
    this.loadData();
  },
};
</script>
<template>
  <div class="language">
    <div class="title">{{ lang.getTranslation(fgLanguage, funcName) }}</div>

    <div class="radio-group">
      <div class="radio-row">
        <input
          type="radio"
          id="english"
          value="english"
          v-model="appData.fgLanguage"
          @change="saveData(constants.languages.ENGLISH)"
        />
        <label for="english">{{ constants.languages.ENGLISH }}</label>
      </div>

      <div class="radio-row">
        <input
          type="radio"
          id="hungarian"
          value="hungarian"
          v-model="appData.fgLanguage"
          @change="saveData(constants.languages.HUNGARIAN)"
        />
        <label for="hungarian">{{ constants.languages.HUNGARIAN }}</label>
      </div>

      <div class="radio-row">
        <input
          type="radio"
          id="german"
          value="german"
          v-model="appData.fgLanguage"
          @change="saveData(constants.languages.GERMAN)"
        />
        <label for="german">{{ constants.languages.GERMAN }}</label>
      </div>

      <div class="radio-row">
        <input
          type="radio"
          id="romanian"
          value="romanian"
          v-model="appData.fgLanguage"
          @change="saveData(constants.languages.ROMANIAN)"
        />
        <label for="romanian">{{ constants.languages.ROMANIAN }}</label>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../scss/common.scss";
//color: $fg-primary-color;
.language {
  .radio-group {
    .radio-row {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;

      input[type="radio"] {
        margin-right: 0.5rem;
        width: 16px;
        height: 16px;
        appearance: none;
        border: 1px solid $fg-secondary-color;
        border-radius: 50%;
        outline: none;
        transition:
          border-color 0.2s,
          background-color 0.2s;

        &:checked {
          border-color: $fg-primary-color;
          // background-color: $fg-primary-color;
        }
      }

      input[type="radio"]::before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $fg-primary-color;
        position: relative;
        top: 3px;
        left: 3px;
        opacity: 0;
        transform: scale(0);
        transition:
          opacity 0.2s,
          transform 0.2s;
      }

      input[type="radio"]:checked::before {
        opacity: 1;
        transform: scale(1);
      }

      label {
        margin: 0;
      }
    }
  }
}
</style>
