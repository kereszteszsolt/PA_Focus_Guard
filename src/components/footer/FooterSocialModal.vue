<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  pText: {
    type: String,
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
    <v-card color="background">
       <v-card-item>
        <v-card-title class="headline">{{props.pText}}</v-card-title>
       </v-card-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog" variant="elevated" elevated="12" color="danger">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
