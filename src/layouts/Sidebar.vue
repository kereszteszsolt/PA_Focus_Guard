<script setup lang="ts">
import { SidebarLists, SidebarToolbar, SidebarLanguageList, SidebarNotFound } from '@/components/sidebar';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const path = computed(() => {
  return route.path.split('/')[1];
});

const pathId = computed(() => {
  return route.params.id;
});

const dynamicComponent = computed(() => {
  switch (path.value) {
    case 'websites':
      return SidebarLists;
    case 'languages':
      return SidebarLanguageList;
    default:
      return SidebarNotFound;
  }
});

</script>

<template>
    <v-container class="d-flex flex-column h-100 pa-0 border-radius-8">
          <component :is="dynamicComponent" />
          <v-divider></v-divider>
          <sidebar-toolbar :path="path" />
    </v-container>
</template>

<style scoped lang="scss">

</style>
