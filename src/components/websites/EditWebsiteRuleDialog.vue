<script setup lang="ts">
import { IWebsiteRule } from '@/interfaces';
import { computed, ref, watch } from 'vue';
import { msg } from '@/constants';
import * as constants from '@/constants';

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
  pSaveItem: {
    type: Function,
    required: true
  },
  pIsNewItem: {
    type: Boolean,
    required: true
  },
  t: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);
let valid = ref(true);
let urlFilter = ref('');
let permanentlyActive = ref(false);
let temporarilyInactive = ref(false);
let urlFilterType = ref('');

const urlFilterRules = computed(() => {
  return [
    (v: string) => !!v || 'URL is required'
  ];
});

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    urlFilter.value = props.pItem?.urlFilter;
    permanentlyActive.value = props.pItem.permanentlyActive;
    temporarilyInactive.value = props.pItem.temporarilyInactive;
    urlFilterType.value = props.pItem.urlFilterType;
  }
});

const validateUrl = (url: string): boolean => {
  const regexPattern = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return regexPattern.test(url);
};
const temporarilyInactiveChanged = () => {
  permanentlyActive.value = temporarilyInactive.value ? false : permanentlyActive.value;
};
const permanentlyActiveChanged = () => {
  temporarilyInactive.value = permanentlyActive.value ? false : temporarilyInactive.value;
};
const close = () => {
  props.pCloseDialog();
};
const save = () => {
  let editedItem: IWebsiteRule = {
    ...props.pItem,
    urlFilter: urlFilter.value,
    permanentlyActive: permanentlyActive.value,
    temporarilyInactive: temporarilyInactive.value,
    urlFilterType: urlFilterType.value
  };
  console.log('editedItem', editedItem);
  props.pSaveItem(editedItem);
};

</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-form v-model="valid" @keydown.enter.prevent>
      <v-card color="background">
        <v-card-item>
          <v-card-title>
            <span class="headline">{{ pIsNewItem ? t(msg.NEW_WEBSITE_RULE) : t(msg.EDIT_WEBSITE_RULE) }}</span>
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="URL"
                  v-model="urlFilter"
                  :rules="urlFilterRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox
                  :label="t(msg.PERMANENTLY_ACTIVE)"
                  v-model="permanentlyActive"
                  @change="permanentlyActiveChanged"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox
                  :label="t(msg.TEMPORARILY_INACTIVE)"
                  v-model="temporarilyInactive"
                  @change="temporarilyInactiveChanged"
                >
                </v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-btn-toggle
                v-model="urlFilterType"
                variant="outlined"
                divided
                mandatory
              >
                <v-btn :value="constants.wsrFilter.DOMAIN">{{constants.wsrFilter.DOMAIN}}</v-btn>
                <v-btn :value="constants.wsrFilter.URL">{{constants.wsrFilter.URL}}</v-btn>
                <v-btn :value="constants.wsrFilter.END_DOMAIN">{{constants.wsrFilter.END_DOMAIN}}</v-btn>
                <v-btn :value="constants.wsrFilter.KEYWORD">{{constants.wsrFilter.KEYWORD}}</v-btn>
              </v-btn-toggle>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="danger" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
          <v-btn @click="save" :disabled="!valid" color="success" variant="elevated" elevation="8">{{ t(msg.SAVE) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
