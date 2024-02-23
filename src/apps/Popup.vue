<script setup lang="ts">
import { useAppDataStore, useStatisticsStore } from '@/store';
import { useTheme } from 'vuetify';
import { watchEffect } from 'vue';

const appDataStore = useAppDataStore();
const statisticsStore = useStatisticsStore();
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
  window.open(chrome.runtime.getURL('options.html#/websites'));
};

</script>

<template>
  <v-card color="background" class="card">
    <v-card-item class="pa-0">
      <v-card-title color="primary">
        <v-sheet color="primary" class="justify-space-around">
          <div class="font-weight-bold text-h5 text-center">Focus Guard</div>
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
          @click="appDataStore.updateFocusModeActive(false)">
          Off
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          color="success"
          class="button-on"
          :class="{'button-on-outlined': !appDataStore.getAppData.focusMode}"
          :variant="!appDataStore.getAppData.focusMode ? 'outlined' : 'flat'"
          @click="appDataStore.updateFocusModeActive(true)">
          On
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" class="text-center pa-0">
        <v-btn @click="options">Settings</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h7">Distraction Attempts:</div>
        <v-btn icon variant="outlined">{{ statisticsStore.getNrOfDistractionAttempts }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
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
