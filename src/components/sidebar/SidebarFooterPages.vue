<script setup lang="ts">
import * as links from '@/links'
</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <v-list class="bg-background border-radius-8">
      <router-link
        v-for="item in links.footerViewLinks" :key="item.id" :to="{name: item.routeName}" class="router-link text">
        <v-list-item color="primary" :value="item.id">
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
