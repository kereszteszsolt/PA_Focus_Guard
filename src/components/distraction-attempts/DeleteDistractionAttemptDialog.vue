<script setup lang="ts">
import { ref, watch } from 'vue';
import { msg } from '@/constants';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  pCloseDialog: {
    type: Function,
    required: true
  },
  pConfirmDelete: {
    type: Function,
    required: true
  },
  t: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);

// Watching the pDialog prop to update the local dialog state
watch(() => props.pDialog, (newValue) => {
  dialog.value = newValue;
}, { immediate: true });

// Calls the pCloseDialog function passed as a prop
const handleCloseDialog = () => {
  dialog.value = false;
  props.pCloseDialog();
};

// Calls the pConfirmDelete function passed as a prop
const handleConfirmDelete = () => {
  dialog.value = false;
  props.pConfirmDelete();
};

</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-card color="background">
      <v-card-title class="headline">{{ t(msg.DELETE_DISTRACTION_ATTEMPT) }}</v-card-title>
      <v-card-text class="text-body-1 mb-4">
        {{ t(msg.ARE_YOU_SURE_DELETE_THIS_DISTRACTION_ATTEMPT) }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="handleCloseDialog" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
        <v-btn @click="handleConfirmDelete" color="danger" variant="elevated" elevation="8">{{ t(msg.DELETE) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
