<script setup lang="ts">
import { defineProps, ref, watch, nextTick } from 'vue';
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
  pLastItem: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);
let lastItem = ref(false);
let wholeDeleteConfirmation = ref(false);

const pCloseDialog = () => {
  dialog.value = false;
  lastItem.value = false;
  wholeDeleteConfirmation.value = false;
  props.pCloseDialog();
};

const pConfirmDelete = () => {
  if (lastItem.value && !wholeDeleteConfirmation.value) {
    return;
  }
  props.pConfirmDelete();
  dialog.value = false;
  nextTick(() => {
    lastItem.value = false;
    wholeDeleteConfirmation.value = false;
  });
};

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  lastItem.value = props.pLastItem;
  wholeDeleteConfirmation.value = false; // This will automatically check the checkbox if it's the last item.
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-card color="background">
      <v-card-title class="headline">{{ t(msg.DELETE_DISTRACTION_ATTEMPT) }}</v-card-title>
      <v-card-text class="text-body-1 mb-4">
        {{ t(msg.ARE_YOU_SURE_DELETE_THIS_DISTRACTION_ATTEMPT) }}
      </v-card-text>
      <v-card-text v-if="lastItem">
        {{ t(msg.THIS_DISTRACTION_ATTEMPT_CONTAINS_ONLY_ONE_URL_FILTER) }}
        <v-checkbox v-model="wholeDeleteConfirmation" label="{{ t(msg.DELETE_THE_ATTEMPT_WHIT_THIS_URL_FILTER) }}"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
        <!-- Adjusted the disable condition to allow deletion when it's not the last item or when wholeDeleteConfirmation is true -->
        <v-btn @click="pConfirmDelete" color="danger" variant="elevated" elevation="8" :disabled="lastItem && !wholeDeleteConfirmation">{{ t(msg.DELETE) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
/* Style adjustments if needed */
</style>
