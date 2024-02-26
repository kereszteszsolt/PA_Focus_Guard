<script setup lang="ts">
import { SidebarLists, SidebarToolbar } from '@/components/sidebar';
import SidebarLanguage from '@/components/sidebar/SidebarLanguageList.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const path = computed(() => {
  return route.path.split('/')[1];
});

const pathId = computed(() => {
  return route.params.id;
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
