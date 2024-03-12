<script setup lang="ts">
import { ILocaleMessages, ILocaleSettings } from '@/interfaces';
import { msg } from '@/constants';
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
  pConfirmDelete: {
    type: Function,
    required: true
  },
  pItem: {
    type: Object as () => ILocaleMessages,
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

const confirmDelete = () => {
  props.pConfirmDelete();
  props.pCloseDialog();
  dialog.value = false;
};

const closeDialog = () => {
  props.pCloseDialog();
  dialog.value = false;
};

</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-card color="background">
      <v-card-title class="headline">{{ t(msg.DELETE_LANGUAGE) }}</v-card-title>
      <v-card-text class="text-body-1 mb-4">
        {{ t(msg.ARE_YOU_SURE_DELETE_THIS_LANGUAGE) }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
        <v-btn @click="confirmDelete" color="danger" variant="elevated" elevation="8">{{ t(msg.DELETE) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
