<script setup lang="ts">
const footerItems = [
  { title: 'About', componentName: 'About', key: 'about' },
  { title: 'Gtc', componentName: 'Gtc', key: 'gtc' },
  // { title: 'Privacy', componentName: 'Privacy', key: 'privacy' },
  // { title: 'Contact', componentName: 'Contact', key: 'contact' },
  { title: 'Acknowledgments', componentName: 'Acknowledgments', key: 'acknowledgments' },
  { title: 'HowToUse', componentName: 'HowToUse', key: 'how-to-use' },
  { title: 'Donations', componentName: 'Donations', key: 'donations' }
];
</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <v-list class="bg-background border-radius-8">
      <router-link
        v-for="item in footerItems" :key="item.key" :to="{name: item.componentName}" class="router-link text">
        <v-list-item color="primary" :value="item.key">
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
