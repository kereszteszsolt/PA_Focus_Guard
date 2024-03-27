<script setup lang="ts">
import { useAppDataStore, useI18nStore, useStatisticsStore } from '@/store';
import { useTheme } from 'vuetify';
import { computed, ref, watch, watchEffect } from 'vue';
import { msg } from '@/constants';
import * as constants from '@/constants';
import * as links from '@/links';
import { ISocialMediaLink } from '@/interfaces';
import { c as r_msg } from '@/_locales/restricted';

const appDataStore = useAppDataStore();
const statisticsStore = useStatisticsStore();
const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
appDataStore.fetchAppData();
statisticsStore.fetchDistractionAttempts();
const theme = useTheme();
theme.global.name.value = appDataStore.getAppData.fgTheme;
const socialMediaDetails = ref(false);
const contextLink = ref({} as ISocialMediaLink);

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

const orderedLinks = computed(() => {
  return links.socialMediaLinks.sort((a, b) => a.footerOrder - b.footerOrder).filter((link) => link.footerOrder > 0);
});
const bodyHeight = computed(() => socialMediaDetails.value ?
  contextLink.value.platformName === 'buy-me-a-coffee' ? '500px' : '380px'
  : '350px');
const bodyWidth = computed(() => socialMediaDetails.value ?
  contextLink.value.platformName === 'buy-me-a-coffee' ? '400px' : '300px' : '300px');

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
const isLoading = computed(() => appDataStore.isLoading || statisticsStore.isLoading || i18n.isLoading);
const switchFocusMode = (active: boolean) => {
  let focusSessionId: string = active ? statisticsStore.getNewUniqueFocusSessionId : constants.common.NOT_APPLICABLE;
  appDataStore.switchFocusMode(active, focusSessionId);
};

const openSocialMediaDetails = (context: ISocialMediaLink) => {
  contextLink.value = context;
  socialMediaDetails.value = true;
  document.body.style.width = bodyWidth.value;
  document.body.style.height = bodyHeight.value;
  // chrome.windows.getCurrent((window) => {
  //   if (window) {
  //     if (typeof window.id === 'number') {
  //       chrome.windows.update(window.id, { height: bodyHeight.value });
  //     }
  //   }
  // });
};
const closeSocialMediaDetails = () => {
  //document.body.style.height = bodyHeight.value;
  contextLink.value = {} as ISocialMediaLink;
  socialMediaDetails.value = false;
  document.body.style.width = bodyWidth.value;
  document.body.style.height = bodyHeight.value;
  // chrome.windows.getCurrent((window) => {
  //   if (window) {
  //     if (typeof window.id === 'number') {
  //       chrome.windows.update(window.id, { height: bodyHeight.value });
  //     }
  //   }
  // });
};
</script>

<template>
  <v-card color="background" class="card" v-if="!isLoading" :height="bodyHeight" :width="bodyWidth">
    <v-card-item class="pa-0">
      <v-card-title color="primary">
        <v-sheet color="primary" class="justify-space-around">
          <div class="font-weight-bold text-h4 text-center">Focus Guard</div>
        </v-sheet>
      </v-card-title>
    </v-card-item>
    <!--      main content-->
    <div class="d-flex flex-column" v-if="!socialMediaDetails">
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
        <v-row class="my-0">
          <v-col cols="12" class="text-center pa-0">
            <v-btn @click="options" color="secondary"><i class="mdi mdi-tune"></i> Options</v-btn>
          </v-col>
        </v-row>
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

      <div class="d-flex flex-row flex-wrap justify-space-between mb-2">
        <v-btn v-for="link in orderedLinks" variant="text" class="flex-1-0" @click="openSocialMediaDetails(link)"
               id="#fgModal" color="info" density="compact" size="regular">
          <v-icon>{{ link.mdiIcon }}</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column justify-space-around text-center fgc-info">
        <p>Focus Guard © 2024 - Keresztes Zsolt</p>
        <p>Free Software. Open source.</p>
        <p>Version: 2.0.0</p>
      </div>
    </div>

    <!-- social media details -->
    <div class="d-flex flex-column" v-if="socialMediaDetails">
      <v-card-subtitle>
        <div class="mb-2">{{ contextLink.platformName }}</div>
      </v-card-subtitle>
      <div class="d-flex flex-column px-3">
        <div class="mb-1 font-weight-bold">{{ tr(r_msg.THANK_Y4Y_INTEREST) }}</div>
        <div> {{ tr(r_msg.NOT_PART_OF_EXTENSION) }}</div>
        <div>{{ tr(r_msg.CLICK_OPEN_NEW_TAB) }}</div>
        <div class="my-2 d-flex flex-column">
          <div class="d-flex flex-row">
            <div class="font-weight-bold fgc-primary mr-1">{{ contextLink.profileName }}</div>
            <div class="font-weight-bold fgc-accent">{{ contextLink.profileIdentifier }}</div>
          </div>
          <a class="fgc-info" :href="contextLink.url" target="_blank">{{ contextLink.url }}</a>
        </div>
        <div class="mb-2">{{ tr(contextLink.shortDescription) }}</div>
        <div class="mb-2">{{ tr(contextLink.callToAction) }}</div>
        <ul class="mb-2 d-flex flex-column no-bullets" v-if="contextLink.list">
          <li v-for="item in contextLink.list || []" :key="item">
            <v-icon color="info" class="px-1">mdi-arrow-right-bold</v-icon>
            {{ tr(item) }}
          </li>
        </ul>
      </div>
    </div>
    <v-card-actions>
      <v-btn @click="closeSocialMediaDetails" v-if="socialMediaDetails" variant="elevated" elevation="12"
             color="primary" class="text-none">
        <v-icon start>mdi-arrow-left</v-icon>
        Vissza
      </v-btn>
      <v-btn v-if="contextLink.image" variant="elevated" elevation="12"
             :style="{ backgroundImage: `url(${contextLink.image})`}" class="custom-button text-none"></v-btn>
      <v-btn v-if="contextLink.mdiIcon" variant="elevated" elevation="12" color="accent" class="text-none">
        <v-icon color="info" start>{{ contextLink.mdiIcon }}</v-icon>
        {{ contextLink.profileIdentifier }}
      </v-btn>
    </v-card-actions>
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

.popup-footer {
  height: 300px;
}

.custom-button {
  background-size: auto 100%; /* This will make the image fit the height of the button */
  background-repeat: no-repeat;
  background-position: center;
  //border-radius: 8px;
  background-color: #ff813f;
  min-width: 128px;
}
</style>
