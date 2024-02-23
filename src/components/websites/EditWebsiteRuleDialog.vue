<script setup lang="ts">
import { IWebsiteRule } from '@/interfaces';
import { computed, ref, watch } from 'vue';

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
  }
});

let dialog = ref(false);
let valid = ref(true);
let url = ref('');
let permanentlyActive = ref(false);
let temporarilyInactive = ref(false);

const urlRules = computed(() => {
  return [
    (v: string) => !!v || 'URL is required'
  ];
});

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    url.value = props.pItem.url;
    permanentlyActive.value = props.pItem.permanentlyActive;
    temporarilyInactive.value = props.pItem.temporarilyInactive;
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
    url: url.value,
    permanentlyActive: permanentlyActive.value,
    temporarilyInactive: temporarilyInactive.value
  };
  console.log('editedItem', editedItem);
  props.pSaveItem(editedItem);
};

</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-form v-model="valid" @keydown.enter.prevent>
      <v-card>
        <v-card-item>
          <v-card-title>
            <span class="headline">{{ pIsNewItem ? 'Add New Item' : 'Edit Item' }}</span>
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="URL"
                  v-model="url"
                  :rules="urlRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox
                  label="Permanently Active"
                  v-model="permanentlyActive"
                  @change="permanentlyActiveChanged"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox
                  label="Temporarily Inactive"
                  v-model="temporarilyInactive"
                  @change="temporarilyInactiveChanged"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="danger">Cancel</v-btn>
          <v-btn @click="save" :disabled="!valid" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
