<script setup lang="ts">
import { ref } from 'vue';
import focus from '@/assets/focus.jpg';

let dialog = ref(true);

</script>

<template>
  <v-dialog v-model="dialog" size="100%" persistent>
    <v-card>
      <v-img :src="focus" contain/>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
