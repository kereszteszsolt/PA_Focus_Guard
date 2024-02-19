<script lang="ts">
import { useAppDataStore } from '@/store/appDataStore';

export default {
  name: 'Popup',
  data() {
    const appDataStore = useAppDataStore();
    return {
      appDataStore
    };
  },
  mounted() {
    this.appDataStore.fetchAppData();
  },
  methods: {
    options() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    }
  }
};
</script>

<template>
  <v-row>
    <v-col>
      <h1>Focus Mode</h1>
    </v-col>
  </v-row>
  <v-row class="on-off-button-group">
    <v-col cols="6">
      <v-btn
        color="danger"
        class="button-off"
        :class="{'button-off-outlined': appDataStore.getAppData.focusMode}"
        :variant="appDataStore.getAppData.focusMode ? 'outlined' : 'flat'"
        @click="appDataStore.updateFocusModeActive(false)">
        Off
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn
        color="success"
        class="button-on"
        :class="{'button-on-outlined': !appDataStore.getAppData.focusMode}"
        :variant="!appDataStore.getAppData.focusMode ? 'outlined' : 'flat'"
        @click="appDataStore.updateFocusModeActive(true)">
        On
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn @click="options">Settings</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.button-off {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
}

.button-on {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 100%;
}

.button-on-outlined {
  border-left: 0;
}

.button-off-outlined {
  border-right: 0;
}

.on-off-button-group {
  display: flex;
  flex-direction: row;
  //justify-content: center;
  //align-items: center;
  margin: 0 1rem;
  > * {
    padding: 1rem 0;
  }
}
</style>
