<script lang="ts">
import { SidebarLists, SidebarToolbar } from '@/components/sidebar';

export default {
  name: 'Sidebar',
  components: {
    SidebarToolbar, SidebarLists
  },
  setup() {
    return {
      //
    };
  }
};
</script>

<template>
    <v-container class="flexContainer">
          <SidebarLists />
          <SidebarToolbar />
    </v-container>
</template>

<style scoped lang="scss">
.flexContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
