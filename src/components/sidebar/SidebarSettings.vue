<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useAppDataStore } from '@/store';
import { watchEffect } from 'vue';
import * as utils from '@/utils';

const theme = useTheme();
const appDataStore = useAppDataStore();
appDataStore.fetchAppData();

const toggleTheme = () => {
  const chosenTheme = theme.global.current.value.dark ? 'fgLightTheme' : 'fgDarkTheme';
  theme.global.name.value = chosenTheme;
  appDataStore.updateFgTheme(chosenTheme);
};

watchEffect(() => {
  if (!appDataStore.isLoading)
    theme.global.name.value = appDataStore.appData.fgTheme;
});

// const messageListener = chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'appDataUpdated') {
//     appDataStore.fetchAppData();
//     sendResponse({status: 'App data fetched'});
//   }
//   return true; // will respond asynchronously
// });
utils.runtimeMessages.createMessageListener('appDataUpdated', () => {
  appDataStore.fetchAppData();
});
</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0 pa-4" color="background">
    <div class="d-flex flex-column justify-space-around">
      <v-btn to="/websites" size="x-large" color="accent" variant="elevated" elevation="12" class="w-100 mb-1">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/settings/languages" size="x-large" color="accent"
             variant="elevated" elevation="12" class="w-100 mb-1">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
      <v-btn @click="toggleTheme" size="x-large" color="accent" variant="elevated" elevation="12" class="w-100 mb-1">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
