<script setup lang="ts">
import { SidebarLists, SidebarToolbar } from '@/components/sidebar';
import SidebarLanguage from '@/components/sidebar/SidebarLanguage.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const path = computed(() => {
  const route = useRoute();
  return route.path.split('/')[1];
});
</script>


<template>
    <v-container class="flexContainer">
          <sidebar-lists v-if="path === 'websites'"/>
          <sidebar-language v-if="path === 'languages'"/>
          <sidebar-toolbar :path="path" />
    </v-container>
</template>

<style scoped lang="scss">
.flexContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}
</style>
