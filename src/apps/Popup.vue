<script setup lang="ts">
import { useAppDataStore, useI18nStore, useStatisticsStore } from '@/store';
import { useTheme } from 'vuetify';
import { computed, ref, watchEffect } from 'vue';
import { msg } from '@/constants';
import * as constants from '@/constants';

const appDataStore = useAppDataStore();
const statisticsStore = useStatisticsStore();
const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
appDataStore.fetchAppData();
statisticsStore.fetchDistractionAttempts();
const theme = useTheme();
theme.global.name.value = appDataStore.getAppData.fgTheme;

watchEffect(() => {
  if (!appDataStore.isLoading) {
    theme.global.name.value = appDataStore.getAppData.fgTheme;
  }
});

const options = () => {
  let extensionPath = chrome.runtime.getURL('');
  let focusMessageFullPath = extensionPath + 'options.html#/focus-message';
  let optionsBasePath = extensionPath + 'options.html';

  chrome.tabs.query({}, (tabs) => {
    let optionsTab = tabs.find(tab => tab.url && tab.url.startsWith(optionsBasePath) && !tab.url.startsWith(focusMessageFullPath));
    if (optionsTab) {
      optionsTab.id && chrome.tabs.update(optionsTab.id, { active: true });
    } else {
      chrome.tabs.create({ url: optionsBasePath });
    }
  });
};

const closeAllFocusMessageTab = () => {
  let extensionPath = chrome.runtime.getURL('');
  let focusMessageFullPath = extensionPath + 'options.html#/focus-message';

  chrome.tabs.query({}, (tabs) => {
    let focusTabs = tabs.filter(tab => tab.url && tab.url.startsWith(focusMessageFullPath));
    focusTabs.forEach(focusTab => {
      focusTab.id && chrome.tabs.remove(focusTab.id);
    });
  });
};

const closeAllOptionsTabs = () => {
  let extensionPath = chrome.runtime.getURL('');
  let optionsBasePath = extensionPath + 'options.html';

  chrome.tabs.query({}, (tabs) => {
    let optionsTabs = tabs.filter(tab => tab.url && tab.url.startsWith(optionsBasePath));
    optionsTabs.forEach(optionsTab => {
      optionsTab.id && chrome.tabs.remove(optionsTab.id);
    });
  });
};

const nrOfOpenFocusMessageTabs = computed(() => {
  let extensionPath = chrome.runtime.getURL('');
  let focusMessageFullPath = extensionPath + 'options.html#/focus-message';

  return new Promise<number>((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      let focusTabs = tabs.filter(tab => tab.url && tab.url.startsWith(focusMessageFullPath));
      resolve(focusTabs.length);
    });
  });
});

const nrOfOpenOptionsTabs = computed(() => {
  let extensionPath = chrome.runtime.getURL('');
  let optionsBasePath = extensionPath + 'options.html';

  return new Promise<number>((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      let optionsTabs = tabs.filter(tab => tab.url && tab.url.startsWith(optionsBasePath));
      resolve(optionsTabs.length);
    });
  });
});

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
const isLoading = computed(() => appDataStore.isLoading || statisticsStore.isLoading || i18n.isLoading);
const switchFocusMode = (active: boolean) => {
  let focusSessionId: string = active ? statisticsStore.getNewUniqueFocusSessionId : constants.common.NOT_APPLICABLE;
  appDataStore.switchFocusMode(active, focusSessionId);
};
</script>

<template>
  <v-card color="background" class="card" v-if="!isLoading">
    <v-card-item class="pa-0">
      <v-card-title color="primary">
        <v-sheet color="primary" class="justify-space-around">
          <div class="font-weight-bold text-h4 text-center">Focus Guard</div>
        </v-sheet>
      </v-card-title>
    </v-card-item>
    <v-row class="on-off-button-group">
      <v-col cols="6">
        <v-btn
          color="danger"
          class="button-off"
          :class="{'button-off-outlined': appDataStore.getAppData.focusMode}"
          :variant="appDataStore.getAppData.focusMode ? 'outlined' : 'flat'"
          @click="switchFocusMode(false)">
          {{ t(msg.OFF) }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          color="success"
          class="button-on"
          :class="{'button-on-outlined': !appDataStore.getAppData.focusMode}"
          :variant="!appDataStore.getAppData.focusMode ? 'outlined' : 'flat'"
          @click="switchFocusMode(true)">
          {{ t(msg.ON) }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" class="text-center pa-0">
        <v-btn @click="options"><i class="mdi mdi-tune"></i> Options</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h7">{{ t(msg.DISTRACTION_ATTEMPTS) }}</div>
        <v-btn icon variant="outlined">{{ statisticsStore.getNumberOfDistractionAttemptsByFocusSessionId(appDataStore.getAppData.focusModeSessionId) }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="pt-4">
      <v-col cols="12" class="text-center pa-0">
        <v-btn @click="closeAllFocusMessageTab">Close All (Focus Tab)</v-btn>
      </v-col>
    </v-row>
    <v-row class="pt-4 pb-4">
      <v-col cols="12" class="text-center pa-0">
        <v-btn @click="closeAllOptionsTabs">Close All (Options Tab)</v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>
</template>

<style scoped lang="scss">
.card {
  margin: 0;
  padding: 0;
  border-radius: 0;
  height: 100vh;
}

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
