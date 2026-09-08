<script setup lang="ts">
import { SidebarLists, SidebarToolbar, SidebarLanguageList, SidebarNotFound } from '@/components/sidebar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarSettings from '@/components/sidebar/SidebarSettings.vue';
import SidebarStatistics from '@/components/sidebar/SidebarStatistics.vue';
import SidebarFooterPages from '@/components/sidebar/SidebarFooterPages.vue';
const route = useRoute();

const pathX = (index: number) => computed(() => {
  return route.path.split('/')[index];
});

const pathId = computed(() => {
  return route.params.id;
});

const dynamicComponent = computed(() => {
  switch (pathX(1).value) {
    case 'websites':
      return SidebarLists;
    case 'languages':
      return SidebarLanguageList;
    case 'settings':
      return SidebarSettings;
    case 'statistics':
      return SidebarStatistics;
    case 'footer-pages':
      return SidebarFooterPages;
    default:
      return SidebarNotFound;
  }
});

</script>

<template>
    <v-container class="sidebar-panel d-flex flex-column h-100 pa-0 border-radius-8">
          <component :is="dynamicComponent"  :path="pathX(2).value"/>

    </v-container>
</template>

<style scoped lang="scss">
.sidebar-panel {
  :deep(.v-list-item) {
    margin: 2px 8px;
    padding-inline: 12px;
    border-radius: 8px;
  }

  :deep(.v-list-item-title) {
    font-size: 14px;
    line-height: 1.5;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  :deep(.v-list-item__spacer) {
    width: 16px;
  }

  :deep(.v-divider) {
    margin: 6px 12px;
    border-color: rgb(var(--v-theme-primary));
    opacity: 0.16;
  }
}
</style>
