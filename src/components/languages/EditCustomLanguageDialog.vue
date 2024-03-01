<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  pCloseDialog: {
    type: Function,
    required: true
  },
  t: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);

watch(() => props.pDialog, (value) => {
  dialog.value = value;
});

</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-btn @click="pCloseDialog">Close</v-btn>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
