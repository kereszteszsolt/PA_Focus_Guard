<script>
import * as dataAccess from "../js/utils/scripts/dataAccess";
import * as constants from "../js/utils/constants";
import * as lang from "../js/utils/languages";
export default {
  computed: {
    lang() {
      return lang;
    },
  },
  data() {
    return {
      fgAppData: {
        focusMode: false,
        fgLanguage: constants.languages.ENGLISH,
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    activate() {
      this.fgAppData.focusMode = true;
      this.saveData(this.fgAppData);
    },
    deactivate() {
      this.fgAppData.focusMode = false;
      this.saveData(this.fgAppData);
    },
    loadData() {
      dataAccess.loadData(constants.localStorage.FG_APP_DATA).then((data) => {
        this.fgAppData = data;
      });
    },
    saveData() {
      dataAccess.saveData(constants.localStorage.FG_APP_DATA, this.fgAppData);
    },
    settings() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL("options.html"));
      }
    },
  },
};
</script>

<template>
  <div class="popup-container">
    <div class="p-title">Focus Guard</div>
    <div class="on-off">
      <button
        :class="{
          'button-danger': !fgAppData.focusMode,
          'button-danger-is-off': fgAppData.focusMode,
        }"
        @click="deactivate"
      >
        {{ lang.getTranslation(fgAppData.fgLanguage, "fgOff") }}
      </button>
      <button
        :class="{
          'button-success': fgAppData.focusMode,
          'button-success-is-off': !fgAppData.focusMode,
        }"
        @click="activate"
      >
        {{ lang.getTranslation(fgAppData.fgLanguage, "fgOn") }}
      </button>
    </div>
    <button class="button-primary button-settings" @click="settings">
      {{ lang.getTranslation(fgAppData.fgLanguage, "fgSettings") }}
    </button>

    <div class="footer">
      <hr />
      <div class="about-paragraph footer-text">
        <p>Focus Guard © 2023 - Keresztes Zsolt</p>
        <p>Free Software. Opensource.</p>
        <p>Version: 1.0.0</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/common.scss";

.footer {
  margin-top: auto;
  color: $fg-primary-color;
  width: 100%;
  margin-bottom: 0.5rem;
}

hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: $fg-secondary-color;

  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.65),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
}

.footer-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-size: 0.75rem;
}

.popup-container {
  display: flex;
  flex-direction: column;
  background-color: floralwhite;
  padding: 0;
  color: $fg-primary-color;
  font-weight: bold;
  align-items: center;
  height: 100vh;
}

.on-off {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
}

.p-title {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $fg-primary-color;
  color: floralwhite;
  font-weight: bold;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;
  padding: 0.25rem;
}

.button-success {
  width: 100%;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  &:hover {
    border-left: 0px;
  }
}

.button-danger {
  width: 100%;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  &:hover {
    border-right: 0px;
  }
}

.button-success-is-off {
  @include button($fg-white-color, lighten($fg-success-color, 10%));
  color: $fg-success-color;
  border-color: $fg-success-color;
  width: 100%;
  border-left: 0px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  &:hover {
    color: $fg-white-color;
  }
}

.button-danger-is-off {
  @include button($fg-white-color, lighten($fg-danger-color, 10%));
  color: $fg-danger-color;
  border-color: $fg-danger-color;
  width: 100%;
  border-right: 0px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  &:hover {
    color: $fg-white-color;
  }
}

.button-settings {
  width: auto;
}
</style>
