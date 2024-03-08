<script setup lang="ts">
import * as links from '@/links'

defineProps<{
  path: string
}>();

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <v-list class="bg-background border-radius-8">
      <router-link
        v-for="item in links.footerViewLinks" :key="item.id" :to="{name: item.routeName}" class="router-link">
        <v-list-item color="primary" :value="item.id" :active="item.routeName.includes(path)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
