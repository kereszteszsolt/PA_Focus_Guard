<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
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
  },
  pNewItem: {
    type: Boolean,
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


const compareJsonKeys = (jsonToTest: ILocaleMessages, expectedJson: ILocaleMessages): string => {
  if (!jsonToTest) return 'The file is empty';


  let messages = '';
  let missingKeys = findMissingKeys(jsonToTest, expectedJson);

  if (missingKeys.length > 0) {
    messages += 'Missing keys: ' + missingKeys.join(', ') + '\n';
  }

  // Speciális kezelés a 'locale' és 'messages' objektumokra
  if (jsonToTest.locale && expectedJson.locale) {
    let missingLocaleKeys = findMissingKeys(jsonToTest.locale, expectedJson.locale);
    if (missingLocaleKeys.length > 0) {
      messages += 'Missing locale keys: ' + missingLocaleKeys.join(', ') + '\n';
    }
  }

  if (jsonToTest.messages && expectedJson.messages) {
    let missingMessagesKeys = findMissingKeys(jsonToTest.messages, expectedJson.messages);
    if (missingMessagesKeys.length > 0) {
      messages += 'Missing messages keys: ' + missingMessagesKeys.join(', ') + '\n';
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


const checkValidJson = (jsonToTest: ILocaleMessages, expectedJson: ILocaleMessages): boolean => {
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
  if (!props.pNewItem) {
    let result: ILocaleMessages[] = props.pCheckIfLocaleExists(jsonToTest);
    if (result && result.length > 0) {
      errorMessage.value = 'Az nyelv-id vagy név már létezik: ' + result.map((r) => r.locale.id + ' - ' + r.locale.name).join(', ');
      return false;
    }
  }
  return true;
};

const save = () => {
  if (checkValidJson(JSON.parse(jsonData.value), JSON.parse(expectedJson.value))) {
    props.pSaveLocaleMessages(JSON.parse(jsonData.value));
    dialog.value = false;
    nextTick(() => {
      jsonData.value = '';
      errorMessage.value = '';
      valid.value = true;
    });
  }
};

const closeDialog = () => {
  props.pCloseDialog();
  dialog.value = false;
  nextTick(() => {
    jsonData.value = '';
    errorMessage.value = '';
    valid.value = true;
  });
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
