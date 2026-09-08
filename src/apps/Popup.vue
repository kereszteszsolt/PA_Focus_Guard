<script setup lang="ts">
import { useAppDataStore, useI18nStore, useStatisticsStore } from '@/store';
import { useTheme } from 'vuetify';
import { computed, watchEffect } from 'vue';
import FooterAttribution from '@/components/common/FooterAttribution.vue';
import { msg } from '@/constants';
import * as constants from '@/constants';
import { c as r_msg } from '@/_locales/restricted';
import { createOptionsRouter as optionsRouter } from '@/router';

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

const openOptions = (routeName?: string) => {
  const optionsBasePath = chrome.runtime.getURL('options.html');
  const focusMessageFullPath = optionsBasePath + '#/focus-message';
  const destination = routeName ? optionsBasePath + optionsRouter.resolve({ name: routeName }).href : optionsBasePath;

  chrome.tabs.query({}, (tabs) => {
    const optionsTab = tabs.find(tab => tab.url && tab.url.startsWith(optionsBasePath) && !tab.url.startsWith(focusMessageFullPath));
    if (optionsTab?.id !== undefined) {
      chrome.tabs.update(optionsTab.id, { active: true, ...(routeName ? { url: destination } : {}) });
    } else {
      chrome.tabs.create({ url: destination });
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
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
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
    <!--      main content-->
    <div class="popup-content">
      <div class="flex-1-0">
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
        <div class="popup-navigation">
          <v-btn @click="openOptions()" color="secondary" class="text-none popup-navigation__button">
            <v-icon start>mdi-tune</v-icon>{{ t(msg.OPTIONS) }}
          </v-btn>
          <v-btn @click="openOptions(constants.routeName.ABOUT)" color="secondary" class="text-none popup-navigation__button">
            <v-icon start>mdi-information-outline</v-icon>{{ tr(r_msg.POPUP_INFO) }}
          </v-btn>
        </div>
        <v-row class="mb-4">
          <v-col cols="12" class="text-center">
            <div class="text-h7 font-weight-bold mb-1 fgc-info">{{ t(msg.DISTRACTION_ATTEMPTS) }}:</div>
            <v-btn icon variant="outlined" :color="appDataStore.getAppData.focusMode ?
          statisticsStore.getNumberOfDistractionAttemptsByFocusSessionId(appDataStore.getAppData.focusModeSessionId) > 0 ? 'danger' : 'success'
          : 'info'">{{
                statisticsStore.getNumberOfDistractionAttemptsByFocusSessionId(appDataStore.getAppData.focusModeSessionId)
              }}
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <footer-attribution class="popup-footer" compact />
      <div class="popup-support">
        <v-btn @click="openOptions(constants.routeName.DONATIONS)" variant="text" color="accent" size="small"
               class="text-none popup-support__button">
          <v-icon start size="16">mdi-coffee</v-icon>{{ tr(r_msg.WAYS_TO_SUPPORT) }}
        </v-btn>
      </div>
    </div>
  </v-card>
  <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>
</template>

<style scoped lang="scss">
.card {
  margin: 0;
  padding: 0;
  border-radius: 0;
  width: 300px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
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

.popup-content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.popup-navigation {
  display: flex;
  gap: 8px;
  margin: 0 16px 12px;

  &__button {
    flex: 1;
    min-width: 0;
    padding: 0 10px;
    font-size: 12px;
  }
}

.popup-support {
  margin: 0 16px 8px;
  text-align: center;

  &__button {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: normal;
  }
}

.popup-footer {
  margin: 0 16px;
  padding-bottom: 8px;
}
</style>
