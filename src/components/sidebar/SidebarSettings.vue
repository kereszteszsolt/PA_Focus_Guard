<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useAppDataStore } from '@/store';
import { watchEffect } from 'vue';
import * as utils from '@/utils';
import { Language } from '@/views/options';

const theme = useTheme();
const appDataStore = useAppDataStore();
appDataStore.fetchAppData();

defineProps(
  {
    path: String
  }
);

const toggleTheme = () => {
  const chosenTheme = theme.global.current.value.dark ? 'fgLightTheme' : 'fgDarkTheme';
  theme.global.name.value = chosenTheme;
  appDataStore.updateFgTheme(chosenTheme);
};

watchEffect(() => {
  if (!appDataStore.isLoading)
    theme.global.name.value = appDataStore.appData.fgTheme;
});

utils.runtimeMessages.createMessageListener('appDataUpdated', () => {
  appDataStore.fetchAppData();
});
</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0 d-flex flex-column" color="background">
    <v-list class="bg-background border-radius-8 flex-1-0">
      <router-link to="/languages" class="router-link">
        <v-list-item color="primary" :value="'languages'">
          <template v-slot:prepend>
            <v-icon icon="mdi-translate"></v-icon>
          </template>
          <v-list-item-title v-text="'Languages'"></v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/settings/settings" class="router-link">
        <v-list-item color="primary" :value="'settings'" :active="path === 'settings'">
          <template v-slot:prepend>
            <v-icon icon="mdi-cog-outline"></v-icon>
          </template>
          <v-list-item-title v-text="'General Settings'"></v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
    <div class="pa-4">
      <v-btn @click="toggleTheme" size="x-large" color="accent" variant="elevated" elevation="12" class="w-100">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
