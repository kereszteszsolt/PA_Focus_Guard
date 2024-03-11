<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { ILocaleMessages } from '@/interfaces';
import * as utils from '@/utils';

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
  }
});

const dialog = ref(false);
const jsonData = ref('');
const expectedJson = ref('');
const valid = ref(true);
const errorMessage = ref('');

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  jsonData.value = JSON.stringify(props.pLocaleMassages, null, 2);
  expectedJson.value = JSON.stringify(props.pDefaultLocaleMassages, null, 2);
}, { immediate: true });

const triggerFileUpload = () => {
  document.getElementById('fileUpload')?.click();
};

const compareJsonKeys = (jsonToTest: ILocaleMessages | null, expectedJson: ILocaleMessages): string => {
  if (!jsonToTest) return 'The file is empty';
  let messages = '';
  let expectedKeys: string [] = Object.keys(expectedJson);
  let testKeys: string [] = Object.keys(jsonToTest);
  let missingKeys: string [] = expectedKeys.filter((key) => !testKeys.includes(key));
  if (missingKeys.length > 0) {
    messages += 'Missing keys: ' + missingKeys.join(', ') + '\n';
  }
  if (jsonToTest.locale && expectedJson.locale) {
    let expectedLocaleKeys: string [] = Object.keys(expectedJson.locale);
    let testLocaleKeys: string [] = Object.keys(jsonToTest.locale);
    let missingLocaleKeys: string [] = expectedLocaleKeys.filter((key) => !testLocaleKeys.includes(key));
    if (missingLocaleKeys.length > 0) { // Corrected here
      messages += 'Missing locale keys: ' + missingLocaleKeys.join(', ') + '\n'; // Corrected here
    }
  }
  if (jsonToTest.messages && expectedJson.messages) {
    let expectedMessagesKeys: string [] = Object.keys(expectedJson.messages);
    let testMessagesKeys: string [] = Object.keys(jsonToTest.messages);
    let missingMessagesKeys: string [] = expectedMessagesKeys.filter((key) => !testMessagesKeys.includes(key));
    if (missingMessagesKeys.length > 0) {
      messages += 'Missing messages keys: ' + missingMessagesKeys.join(', ') + '\n';
    }
  }
  return messages;
};

const checkValidJson = (jsonToTest: any | null, expectedJson: any | null): boolean => {
  errorMessage.value = '';
  if (!jsonToTest) {
    errorMessage.value = 'Nem sikerült a fájl feldolgozása.';
    return false;
  }
  let differentKeys = compareJsonKeys(jsonToTest, expectedJson);
  if (differentKeys !== '') {
    errorMessage.value = 'A fájl nem tartalmazza az összes kulcsot.' + differentKeys;
    return false;
  }
  let result: ILocaleMessages[] = props.pCheckIfLocaleExists(jsonToTest);
  if (result && result.length > 0) {
    errorMessage.value = 'Az nyelv-id vagy név már létezik: ' + result.map((r) => r.locale.id + ' - ' + r.locale.name).join(', ');
    return false;
  }
  return true;
};

const save = () => {
  if (checkValidJson(jsonData.value, expectedJson.value)) {
    props.pSaveLocaleMessages(jsonData.value);
    jsonData.value = '';
    errorMessage.value = '';
    dialog.value = false;
  }
};

const closeDialog = () => {
  jsonData.value = '';
  errorMessage.value = '';
  valid.value = true;
  dialog.value = false;
  props.pCloseDialog();
};


const uploadFile = (event: Event) => {
  utils.file.uploadFile(event, (fileContent: string) => {
      jsonData.value = fileContent;
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
          <v-textarea v-model="jsonData" max-rows="25" rows="25" class="fgScroll"
                      :error-messages="errorMessage"></v-textarea>
        </v-card-text>
        <v-card-text>
          <input type="file" id="fileUpload" @change="uploadFile" style="display: none"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" variant="elevated" elevation="12" @click="triggerFileUpload">Feltöltés</v-btn>
          <v-btn color="accent" variant="elevated" elevation="12"
                 @click="utils.file.downloadAsJsonFile(jsonData, `current-file.json`)">Letöltés
          </v-btn>
          <v-btn color="success" variant="elevated" elevation="12" @click="save">Save</v-btn>
          <v-btn @click="closeDialog" color="danger" variant="elevated" elevation="12">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
