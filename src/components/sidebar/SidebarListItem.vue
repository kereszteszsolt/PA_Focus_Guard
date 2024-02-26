<script setup lang="ts">
import SidebarListItemMenu from '@/components/sidebar/SidebarListItemMenu.vue';

defineProps({
  listId: String,
  listName: String,
  deleteItem: { type: Function, required: true },
  editItem: { type: Function, required: true },
  moveUp: { type: Function, required: true },
  moveDown: { type: Function, required: true },
  t: { type: Function, required: true }
});

</script>

<template>
  <v-list-item color="primary" :value="listId">
    <v-list-item-title>{{ listName }}</v-list-item-title>
    <template v-slot:append>
      <sidebar-list-item-menu
        :list-id="listId"
        :edit-item="editItem"
        :delete-item="deleteItem"
        :move-up="moveUp"
        :move-down="moveDown"
        :t="t"
      />
    </template>
  </v-list-item>
</template>

<style scoped lang="scss">

</style>
