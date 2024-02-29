<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useAppDataStore } from '@/store';
import { watchEffect } from 'vue';

defineProps({
  path: {
    type: String,
    required: true
  }
});

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

</script>

<template>
  <v-container class="d-flex justify-space-between align-center fg-h-104px">
    <v-btn to="/websites" size="x-large" icon='mdi-home' v-if="path !== 'websites'" color="accent" variant="elevated" elevation="12"></v-btn>
    <v-btn @click="toggleTheme" size="x-large"  color="accent" variant="elevated" elevation="12"
           :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-btn>
    <v-btn to="/languages" size="x-large" icon='mdi-translate' v-if="path !== 'languages'" color="accent" variant="elevated" elevation="12"></v-btn>
    <v-btn to="/settings" size="x-large" icon='mdi-wrench' v-if="path !== 'settings'" color="accent" variant="elevated" elevation="12"></v-btn>
  </v-container>
</template>

<style scoped lang="scss">

</style>
