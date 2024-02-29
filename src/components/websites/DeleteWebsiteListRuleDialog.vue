<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { IWebsiteRuleList } from '@/interfaces';
import { msg } from '@/constants';

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
  },
  t: {
    type: Function,
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
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-card color="background">
      <v-card-item>
        <v-card-title class="headline">{{t(msg.DELETE_WEBSITE_RULE_LIST)}}</v-card-title>
      </v-card-item>
      <v-card-text class="text-body-1 mb-4">
        {{ t(msg.ARE_YOU_SURE_DELETE_THIS_WEBSITE_RULE_LIST) }}
      </v-card-text>
      <v-divider v-if="!isEmpty"></v-divider>
      <v-card-text v-if="!isEmpty" class="text-body-1 mb-4">
        <span class="error">{{ t(msg.THE_WEBSITE_RULE_LIST_IS_NOT_EMPTY) }}</span>
        <v-checkbox
          color="danger" v-if="!isEmpty" v-model="confirmDeleteListItems"
          :label="t(msg.ALSO_DELETE_ALL_ASSOCIATED_WEBSITE_RULES)">
        </v-checkbox>
      </v-card-text>
      <v-divider v-if="!isEmpty"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
        <v-btn @click="pDeleteItemConfirm" color="danger" variant="elevated" elevation="8" :disabled="!eligibleForDeletion">
          {{ t(msg.DELETE) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.error{
  color: rgb(var(--v-theme-error)) !important;
}
</style>
