<script setup lang="ts">
import { AppBar, Sidebar, FgFooter } from '@/layouts';
import { useTheme } from 'vuetify';
import { computed, watchEffect } from 'vue';
import * as utils from '@/utils';
import { useAppDataStore } from '@/store';
import { SidebarToolbar } from '@/components/sidebar';

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
  <v-layout class="options-shell">
    <v-sheet class="options-background" :class="{'mathPatternLight': !isDark, 'mathPatternDark': isDark}">
      <app-bar class="options-header"/>
      <v-main class="options-main">
        <v-container class="container">
          <v-sheet elevation="12" color="background" class="options-pane border-top-radius-8 fg-sidebar-w fgScroll">
            <sidebar/>
          </v-sheet>
          <v-sheet elevation="12" color="background"
                   class="options-pane d-flex flex-column border-top-radius-8 fg-content-w fgScroll">
            <router-view/>
          </v-sheet>
          <v-sheet elevation="12" color="background" class="border-bottom-radius-8 fg-sidebar-w">
            <sidebar-toolbar/>
          </v-sheet>
          <v-sheet elevation="12" color="background" class="border-bottom-radius-8 fg-content-w">
            <fg-footer/>
          </v-sheet>
        </v-container>
      </v-main>
    </v-sheet>
  </v-layout>
</template>

<style scoped lang="scss">
.options-shell {
  position: fixed;
  inset: 0;
  overflow: hidden;

  :deep(.data-table-page) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  :deep(.data-table-page > .v-data-table) {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  :deep(.data-table-page .v-table__wrapper) {
    min-height: 0;
    overscroll-behavior: contain;
  }

  :deep(.data-table-page .v-data-table-footer),
  :deep(.data-table-page .v-toolbar) {
    flex-shrink: 0;
  }

  :deep(.data-table-page .v-table--fixed-header > .v-table__wrapper > table > thead > tr > th) {
    background: rgb(var(--v-theme-background));
  }

  :deep(.elevation-12) {
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16) !important;
  }

  :deep(.v-btn.elevation-12) {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.18) !important;
  }

  :deep(.fg-content-w h1),
  :deep(.v-data-table .v-toolbar-title) {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }

  :deep(.v-data-table .v-toolbar) {
    background: rgba(var(--v-theme-primary), 0.05);
    border-bottom: 1px solid rgba(var(--v-theme-primary), 0.16);
  }

  :deep(.v-data-table thead) {
    background: rgba(var(--v-theme-primary), 0.025);
  }
}

.mathPatternLight {
  height: 100%;
  width: 100vw;
  background-color: #f4f1e8;
  background-image: linear-gradient(rgba(204, 187, 141, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 187, 141, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.mathPatternDark {
  height: 100%;
  width: 100vw;
  background-color: #2b2b2b;
  background-image: linear-gradient(rgba(102, 95, 71, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 95, 71, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
}

.options-background {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.options-header {
  flex-shrink: 0;
}

.options-main {
  flex: 1;
  min-height: 0;
  overflow-x: auto;
  overflow-y: hidden;
}

.container {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) 80px;
  gap: 2px 16px;
  width: 100%;
  min-width: 1000px;
  max-width: 1140px;
  height: 100%;
  padding: 16px;
  margin: 0 auto;

  > .v-sheet {
    width: auto;
    min-width: 0;
    min-height: 0;
  }
}

.options-pane {
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
