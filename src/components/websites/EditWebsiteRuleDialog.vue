<script setup lang="ts">
import { IWebsiteRule } from '@/interfaces';
import { computed, ref, watch, watchEffect } from 'vue';
import { msg } from '@/constants';
import * as constants from '@/constants';
import * as utils from '@/utils';
import { validateKeyWord } from '@/utils/url-filter';

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

const form = ref(null);
let dialog = ref(false);
let valid = ref(true);
let urlFilter = ref('');
let permanentlyActive = ref(false);
let temporarilyInactive = ref(false);
let urlFilterType = ref('');

const urlFilterRules = computed(() => {
  return [
    (v: string) => !!v || props.t(msg.URL_FILTER_REQUIRED),
    (v: string) => urlFilterType.value === constants.wsrFilter.URL ? utils.urlFilter.validateUrl(v) || props.t(msg.INVALID_URL) : true,
    (v: string) => urlFilterType.value === constants.wsrFilter.DOMAIN ? utils.urlFilter.validateDomain(v) || props.t(msg.INVALID_DOMAIN) : true,
    (v: string) => urlFilterType.value === constants.wsrFilter.END_DOMAIN ? utils.urlFilter.validateEndDomain(v) || props.t(msg.INVALID_END_DOMAIN) : true,
    (v: string) => urlFilterType.value === constants.wsrFilter.KEYWORD ? utils.urlFilter.validateKeyWord(v) || props.t(msg.INVALID_KEYWORD) : true
  ];
});

const fieldTouched = ref(false); // Reactive reference for the touched state
let errorMessage = ref(''); // Reactive reference for the error message
const touched = () => {
  fieldTouched.value = true;
  validateField();
};

const validateField = () => {
  errorMessage.value = '';
  const rules = urlFilterRules.value; // Assume urlFilterRules is a computed ref as previously defined
  for (let rule of rules) {
    const validationResult = rule(urlFilter.value);
    if (validationResult !== true) {
      // If the rule returns an error message (i.e., validation fails), update errorMessage
      errorMessage.value = validationResult;
      valid.value = false; // Update the valid state based on validation
      break; // Exit loop after the first error is found
    } else {
      valid.value = true; // Ensure valid is true if all validations pass
    }
  }
};

// Initial watch to handle changes in urlFilter or urlFilterType
watch([urlFilter, urlFilterType], () => {
  if (fieldTouched.value) {
    validateField();
  }
}, { immediate: true }); // The immediate option ensures this runs on initial setup too

const urlFilterPlaceholder = computed(() => {
  switch (urlFilterType.value) {
    case constants.wsrFilter.URL:
      return 'https://example.com, https://example.com/video, https://app.example.com/, ...';
    case constants.wsrFilter.DOMAIN:
      return 'example.com, video.example.com, app.example.com ...';
    case constants.wsrFilter.END_DOMAIN:
      return '.com, .hu, .de, .ro, .info, ...';
    case constants.wsrFilter.KEYWORD:
      return 'keyword, video, games, news, ...';
    default:
      return '';
  }
});

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    urlFilter.value = props.pItem?.urlFilter;
    permanentlyActive.value = props.pItem.permanentlyActive;
    temporarilyInactive.value = props.pItem.temporarilyInactive;
    urlFilterType.value = props.pItem.urlFilterType;
    valid.value = true;
    errorMessage.value = '';
    fieldTouched.value = false;
  }
});

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
  validateField();
  if (valid.value) {
    let editedItem: IWebsiteRule = {
      ...props.pItem,
      urlFilter: urlFilter.value,
      permanentlyActive: permanentlyActive.value,
      temporarilyInactive: temporarilyInactive.value,
      urlFilterType: urlFilterType.value
    };
    console.log('editedItem', editedItem);
    props.pSaveItem(editedItem);
  }
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
              <v-col cols="12" class="d-flex flex-column">
                <v-text-field
                  label="Url-Filter"
                  v-model="urlFilter"
                  :error-messages="errorMessage"
                  required
                  :placeholder="urlFilterPlaceholder"
                  @blur="touched"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="pa-0">
              <v-col cols="6" class="pa-0">
                <v-checkbox
                  :label="t(msg.PERMANENTLY_ACTIVE)"
                  v-model="permanentlyActive"
                  @change="permanentlyActiveChanged"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-checkbox
                  :label="t(msg.TEMPORARILY_INACTIVE)"
                  v-model="temporarilyInactive"
                  @change="temporarilyInactiveChanged"
                >
                </v-checkbox>
              </v-col>
            </v-row>
            <v-row class="d-flex flex-column justify-space-around">
              <v-label>{{ t(msg.PLEASE_SELECT_FILTERING_TYPE) }}</v-label>
              <v-btn-toggle
                v-model="urlFilterType"
                variant="outlined"
                divided
                mandatory
                rounded
              >
                <v-btn :value="constants.wsrFilter.DOMAIN">{{ t(msg.DOMAIN) }}</v-btn>
                <v-btn :value="constants.wsrFilter.URL">{{ t(msg.URL) }}</v-btn>
                <v-btn :value="constants.wsrFilter.END_DOMAIN">{{ t(msg.END_DOMAIN) }}</v-btn>
                <v-btn :value="constants.wsrFilter.KEYWORD">{{ t(msg.KEYWORD) }}</v-btn>
              </v-btn-toggle>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="danger" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
          <v-btn @click="save" :disabled="!valid" color="success" variant="elevated" elevation="8">{{
              t(msg.SAVE)
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
