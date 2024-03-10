<script setup lang="ts">
import { useAppDataStore } from '@/store';
import * as constants from '@/constants';
import { computed, ComputedRef } from 'vue';

const appDataStore = useAppDataStore();
appDataStore.fetchAppData();

defineProps(
  {
    path: String
  }
);

const fgTheme: ComputedRef<string> = computed(() => appDataStore.getAppData.fgTheme);
const toggleTheme = () => {
  const chosenTheme = (fgTheme.value === constants.common.FG_DARK_THEME) ? constants.common.FG_LIGHT_THEME : constants.common.FG_DARK_THEME;
  appDataStore.updateFgTheme(chosenTheme);
};
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
        <v-icon>{{ (fgTheme === constants.common.FG_DARK_THEME) ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
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
