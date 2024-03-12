<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
import { ILocaleMessages } from '@/interfaces';
import * as utils from '@/utils';
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
  t: {
    type: Function,
    required: true
  },
  pLocaleMassages: {
    type: Object as () => ILocaleMessages,
    required: true
  },
  pDefaultLocaleMassages: {
    type: Object as () => ILocaleMessages,
    required: true
  },
  pCheckIfLocaleExists: {
    type: Function,
    required: true
  },
  pSaveLocaleMessages: {
    type: Function,
    required: true
  },
  pNewItem: {
    type: Boolean,
    required: true
  }
});

const dialog = ref(false);
const contextItem = ref<ILocaleMessages | null>(null);
const expectedItem = ref<ILocaleMessages | null>(null);
const valid = ref(true);
const newItem = ref(false);
const errorMessage = ref('');

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  contextItem.value = props.pNewItem ? null : props.pLocaleMassages;
  expectedItem.value = props.pDefaultLocaleMassages;
  newItem.value = props.pNewItem;
}, { immediate: true });

const contextDataString = computed({
  get: () => {
    return contextItem.value ? JSON.stringify({ locales: contextItem.value.locale, messages: contextItem.value.messages }, null, 2) : '';
  },
  set: (value: string) => {
    try {
      contextItem.value = {
        id: contextItem.value?.id || '',
        lsId: contextItem.value?.lsId || '',
        locale: JSON.parse(value).locales,
        messages: JSON.parse(value).messages
      };
    } catch (e) {
      errorMessage.value = 'Nem sikerült a fájl feldolgozása.';
    }
  }
});

const triggerFileUpload = () => {
  document.getElementById('fileUpload')?.click();
};


const compareJsonKeys = (jsonToTest: any, expectedJson: any): string => {
  if (!jsonToTest) return props.t(msg.FILE_IS_EMPTY);


  let messages = '';
  let missingKeys = findMissingKeys(jsonToTest, expectedJson);

  if (missingKeys.length > 0) {
    messages += props.t(msg.MISSING_KEYS) + missingKeys.join(', ') + '\n';
  }

  // Speciális kezelés a 'locale' és 'messages' objektumokra
  if (jsonToTest.locale && expectedJson.locale) {
    let missingLocaleKeys = findMissingKeys(jsonToTest.locale, expectedJson.locale);
    if (missingLocaleKeys.length > 0) {
      messages += props.t(msg.MISSING_LOCALE_KEYS) + missingLocaleKeys.join(', ') + '\n';
    }
  }

  if (jsonToTest.messages && expectedJson.messages) {
    let missingMessagesKeys = findMissingKeys(jsonToTest.messages, expectedJson.messages);
    if (missingMessagesKeys.length > 0) {
      messages += props.t(msg.MISSING_MESSAGE_KEYS) + missingMessagesKeys.join(', ') + '\n';
    }
  }

  return messages;
};

// Segédfüggvény a hiányzó kulcsok megtalálására
function findMissingKeys(testObj: { [key: string]: any }, expectedObj: { [key: string]: any }): string[] {
  let testKeys: string[] = Object.keys(testObj);
  let expectedKeys: string[] = Object.keys(expectedObj);
  return expectedKeys.filter(key => !testKeys.includes(key));
}


const checkValidJson = (itemToValidate: ILocaleMessages | null, expected: ILocaleMessages | null): boolean => {
  errorMessage.value = '';
  if (!itemToValidate) {
    errorMessage.value = props.t(msg.ERROR_FILE_NOT_PROCESSED);
    return false;
  }
  if (!expected) {
    errorMessage.value = props.t(msg.ERROR_FALLBACK_LANGUAGE_NOT_FOUND);
    return false;
  }
  let differentKeys = compareJsonKeys({locale: itemToValidate.locale, messages: itemToValidate.messages}, { locale: expected.locale, messages: expected.messages });
  if (differentKeys !== '') {
    errorMessage.value = props.t(msg.FILE_DOES_NOT_CONTAIN_ALL_KEYS) + differentKeys;
    return false;
  }
  let results: string = props.pCheckIfLocaleExists(itemToValidate);
  if (results) {
    errorMessage.value = props.t(msg.LANGUAGE_KEY_OR_NAME_ALREADY_EXISTS) + results;
    return false;
  }
  return true;
};

const save = () => {
  if (checkValidJson(contextItem.value, expectedItem.value)) {
    props.pSaveLocaleMessages(contextItem.value);
    dialog.value = false;
    nextTick(() => {
      contextItem.value = null;
      errorMessage.value = '';
      valid.value = true;
    });
  }
};

const closeDialog = () => {
  props.pCloseDialog();
  dialog.value = false;
  nextTick(() => {
    contextItem.value = null;
    errorMessage.value = '';
    valid.value = true;
  });
};

const uploadFile = (event: Event) => {
  utils.file.uploadFile(event, (fileContent: string) => {
      contextItem.value = JSON.parse(fileContent);
    },
    (error: string) => {
      errorMessage.value = error;
      if (error) {
        dialog.value = false;
      }
    });
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent color="background">
    <v-form v-model="valid" @keydown.enter.prevent>
      <v-card color="background">
        <v-card-item>
          <v-card-title class="headline">Edit/Add Language</v-card-title>
        </v-card-item>

        <v-card-text>
          <v-textarea v-model="contextDataString" max-rows="25" rows="25" class="fgScroll"
                      :error-messages="errorMessage"></v-textarea>
        </v-card-text>
        <v-card-text>
          <input type="file" id="fileUpload" @change="uploadFile" style="display: none"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" variant="elevated" elevation="12" @click="triggerFileUpload" v-if="newItem">{{t(msg.UPLOAD)}}</v-btn>
          <v-btn color="accent" variant="elevated" elevation="12" v-if:="contextItem"
                 @click="utils.file.downloadAsJsonFile(contextDataString, `current-file.json`)">{{t(msg.DOWNLOAD)}}</v-btn>
          <v-btn color="success" variant="elevated" elevation="12" @click="save">{{t(msg.SAVE)}}</v-btn>
          <v-btn @click="closeDialog" color="danger" variant="elevated" elevation="12">{{t(msg.CLOSE)}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
