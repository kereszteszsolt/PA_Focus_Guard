<script setup lang="ts">
import { AppBar, Sidebar, FgFooter } from '@/layouts';
import { useTheme } from 'vuetify';
import { computed, watchEffect } from 'vue';
import * as utils from '@/utils';
import { useAppDataStore } from '@/store';

const appDataStore = useAppDataStore();
appDataStore.fetchAppData();
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);

watchEffect(() => {
  if (!appDataStore.isLoading)
    theme.global.name.value = appDataStore.appData.fgTheme;
});

utils.runtimeMessages.createMessageListener('appDataUpdated', () => {
  appDataStore.fetchAppData();
});
</script>

<template>
  <v-layout>
    <v-sheet :class="{'mathPatternLight': !isDark, 'mathPatternDark': isDark}">
      <app-bar/>
      <v-main>
        <v-container class="container">
          <div class="d-flex flex-row">
            <v-sheet elevation="12" height="88.5vh" color="background" class="border-radius-8 mr-4">
              <sidebar/>
            </v-sheet>
            <v-sheet elevation="12" height="88.5vh" color="background" class="d-flex flex-column border-radius-8">
              <router-view/>
              <v-divider></v-divider>
              <fg-footer/>
            </v-sheet>
          </div>
        </v-container>
      </v-main>
    </v-sheet>
  </v-layout>
</template>

<style scoped lang="scss">
.mathPatternLight {
  height: 100vh;
  width: 100vw;
  background-color: #f4f1e8;
  background-image: linear-gradient(rgba(204, 187, 141, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 187, 141, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.mathPatternDark {
  height: 100vh;
  width: 100vw;
  background-color: #2b2b2b;
  background-image: linear-gradient(rgba(102, 95, 71, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 95, 71, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
}

.r-container {
  min-width: 1080px;
  min-height: 850px;
}

.container {
  max-width: 100%;
  min-height: 850px;
  padding: 16px 16px 0 16px;
  margin-top: 0;
  margin-right: auto;
  margin-left: auto;

  // Define breakpoints for different screen sizes
  //@media (min-width: 576px) {
  //  max-width: 540px;
  //}
  //
  //@media (min-width: 768px) {
  //  max-width: 720px;
  //}

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}
</style>
