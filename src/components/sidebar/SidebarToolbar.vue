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
  <v-container>
    <v-btn @click="toggleTheme" size="x-large"  color="accent" variant="elevated"
           :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-btn>
    <v-btn to="/languages" size="x-large" icon='mdi-translate' v-if="path !== 'languages'" color="accent" variant="elevated"></v-btn>
    <v-btn to="/websites" size="x-large" icon='mdi-home' v-if="path !== 'websites'" color="accent" variant="elevated"></v-btn>
  </v-container>
</template>

<style scoped lang="scss">

</style>
