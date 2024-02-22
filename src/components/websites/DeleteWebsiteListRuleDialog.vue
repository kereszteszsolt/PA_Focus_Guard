<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { IWebsiteRuleList } from '@/interfaces';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  pItem: {
    type: Object as () => IWebsiteRuleList,
    required: true
  },
  pCloseDialog: {
    type: Function,
    required: true
  },
  pDeleteItemConfirm: {
    type: Function,
    required: true
  },
  pIsEmpty: {
    type: Boolean,
    required: true
  }
});

let item = ref({} as IWebsiteRuleList);
let dialog = ref(false);
let confirmDeleteListItems = ref(false);
let isEmpty = ref(false);

const eligibleForDeletion = computed(() => !isEmpty.value ? confirmDeleteListItems.value : true);

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    item.value = props.pItem;
    isEmpty.value = props.pIsEmpty;
  }
});

</script>

<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-item>
        <v-card-title class="headline">Delete Website Rule</v-card-title>
      </v-card-item>
      <v-card-text class="text-body-1 mb-4">
        Are you sure you want to delete this website rule?
      </v-card-text>
      <v-divider v-if="!isEmpty"></v-divider>
      <v-checkbox
        color="danger" v-if="!isEmpty" v-model="confirmDeleteListItems" label="Also delete all items in this list"></v-checkbox>
      <v-divider v-if="!isEmpty"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog" color="primary">Cancel</v-btn>
        <v-btn @click="pDeleteItemConfirm" color="danger" :disabled="!eligibleForDeletion">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
