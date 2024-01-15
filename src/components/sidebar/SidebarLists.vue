<script setup lang="ts">

</script>

<template>
<v-sheet class="sidebar-lists" color="background">
  <ul>
    <li>
      <router-link to="/tiles">Tiles</router-link>
    </li>
    <li>
      <router-link to="/options">Options</router-link>
    </li>
  </ul>
</v-sheet>
</template>

<style scoped lang="scss">
.sidebar-lists {
  height: 100%;
}
</style>
