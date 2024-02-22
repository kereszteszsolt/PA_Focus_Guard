<script lang="ts">
import { useTheme } from 'vuetify';
import { useAppDataStore } from '@/store';
import { watchEffect } from 'vue';

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  setup() {
    const theme = useTheme();
    const appDataStore = useAppDataStore();
    appDataStore.fetchAppData();
    const toggleTheme = () => {
      let chosenTheme = theme.global.current.value.dark ? 'fgLightTheme' : 'fgDarkTheme';
      theme.global.name.value = chosenTheme;
      appDataStore.updateFgTheme(chosenTheme);
      theme.global.name.value = appDataStore.getAppData.fgTheme;
    };

    watchEffect(() => {
      if (!appDataStore.isLoading) {
        theme.global.name.value = appDataStore.getAppData.fgTheme;
      }
    });

    return {
      theme,
      toggleTheme
    };
  }
};
</script>

<template>
  <v-container>
    <v-btn @click="toggleTheme" size="x-large"
           :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-btn>
    <v-btn to="/languages" size="x-large" icon = 'mdi-translate' v-if="path !== 'languages'"></v-btn>
    <v-btn to="/websites" size="x-large" icon = 'mdi-home' v-if="path !== 'websites'"></v-btn>
  </v-container>
</template>

<style scoped lang="scss">

</style>
