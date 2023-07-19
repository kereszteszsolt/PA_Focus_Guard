<script>
import * as dataAccess from "../js/utils/scripts/dataAccess";
import * as constants from "../js/utils/constants";
export default {
  data() {
    return {
      isOn: true,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    activate() {
      this.isOn = true;
      this.saveData(this.isOn);
    },
    deactivate() {
      this.isOn = false;
      this.saveData(this.isOn);
    },
    loadData() {
      dataAccess.loadData(constants.localStorage.FG_ACTIVE).then((data) => {
        this.isOn = data;
      });
    },
    saveData(data) {
      dataAccess.saveData(constants.localStorage.FG_ACTIVE, data);
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
        :class="{ 'button-danger': !isOn, 'button-danger-is-off': isOn }"
        @click="deactivate"
      >
        Off
      </button>
      <button
        :class="{ 'button-success': isOn, 'button-success-is-off': !isOn }"
        @click="activate"
      >
        On
      </button>
    </div>
    <button class="button-primary" @click="settings">settings</button>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/common.scss";

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
</style>
