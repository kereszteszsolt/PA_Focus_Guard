<script setup lang="ts">
import { IWebsiteRule } from '@/interfaces';
import { ref, watch } from 'vue';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  pItem: {
    type: Object as () => IWebsiteRule,
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

let item = ref({} as IWebsiteRule);
let dialog = ref(false);
let isEmpty = ref(false);

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    item.value = props.pItem;
    isEmpty.value = props.pIsEmpty;
  }
});

</script>

<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <v-card>
      <v-card-title class="headline">Delete Website Rule</v-card-title>
      <v-card-text>
        Are you sure you want to delete this website rule?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog">Cancel</v-btn>
        <v-btn @click="pDeleteItemConfirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
