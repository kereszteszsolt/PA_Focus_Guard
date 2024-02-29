<script setup lang="ts">
import { IWebsiteRule } from '@/interfaces';
import { ref, watch } from 'vue';
import { msg } from '@/constants';

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
  },
  t: {
    type: Function,
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
  <v-dialog v-model="dialog" max-width="900px" persistent >
    <v-card color="background">
      <v-card-title class="headline">{{t(msg.DELETE_WEBSITE_RULE)}}</v-card-title>
      <v-card-text class="text-body-1 mb-4">
        {{ t(msg.ARE_YOU_SURE_DELETE_THIS_WEBSITE_RULE) }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog" color="success" variant="elevated"  elevation="8">{{ t(msg.CANCEL) }}</v-btn>
        <v-btn @click="pDeleteItemConfirm" color="danger" variant="elevated"  elevation="8">{{ t(msg.DELETE) }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
