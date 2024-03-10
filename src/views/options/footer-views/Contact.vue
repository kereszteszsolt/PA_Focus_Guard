<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { socialMediaLinks } from '@/links';
</script>

<template>
  <footer-view-wrapper title="Contact">
    <v-btn v-for="link in socialMediaLinks" variant="text" class="flex-1-0"
           color="info" density="compact">
      <v-icon>{{ link.mdiIcon }}</v-icon>
    </v-btn>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">

</style>
