<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { ILocaleMessages } from '@/interfaces';

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

const dialog = ref(props.pDialog);
const jsonData = ref('');
const uploadedJsonData = ref<ILocaleMessages | null>(null);
const valid = ref(true);
const errorMessage = ref('valid');

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  jsonData.value = JSON.stringify(props.pLocaleMassages);
});

const downloadJson = () => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData.value);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', 'jsonData.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const triggerFileUpload = () => {
  document.getElementById('fileUpload')?.click();
};

const jsonCode = computed({
  get: () => {
    return JSON.stringify(uploadedJsonData.value, null, 2);
  },
  set: (newValue) => {
    try {
      uploadedJsonData.value = JSON.parse(newValue);
    } catch (error) {
      console.error('Invalid JSON format');
    }
  }
});

const uploadFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  const file = input.files[0];
  if (file.type === 'application/json') {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
      try {
        uploadedJsonData.value = JSON.parse(content as string);
        console.log(uploadedJsonData);
      } catch (error) {
        alert('Hiba a JSON fájl feldolgozása során.');
      }
    };
    reader.readAsText(file);
  } else {
    alert('Kérlek, JSON fájlt tölts fel!');
  }
};

//compare json totest with expected json to check if all keys are present and return the missing keys
const compareJsonKeys = (jsonToTest: ILocaleMessages | null, expectedJson: ILocaleMessages): boolean => {
  if (!jsonToTest) return false;
  const missingKeys = Object.keys(expectedJson).filter(key => !Object.keys(jsonToTest).includes(key));
  return missingKeys.length === 0;
};

const checkValidJson = (jsonToTest: ILocaleMessages | null, expectedJson: ILocaleMessages): boolean => {
  errorMessage.value = '';
  if (!jsonToTest) {
    errorMessage.value = 'Nem sikerült a fájl feldolgozása.';
    return false;
  }
  if (!compareJsonKeys(jsonToTest, expectedJson)) {
    errorMessage.value = 'A fájl nem tartalmazza az összes kulcsot.' + JSON.stringify(Object.keys(expectedJson));
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
  if (checkValidJson(uploadedJsonData.value, props.pDefaultLocaleMassages)) {
    props.pSaveLocaleMessages(uploadedJsonData.value);
    dialog.value = false;
  }
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
          <v-textarea v-model="jsonCode" max-rows="25" rows="25" class="fgScroll"></v-textarea>
        </v-card-text>
        <v-card-text>
          <p >{{ errorMessage }}</p>
          <input type="file" id="fileUpload" @change="uploadFile" style="display: none"/>
          <p >{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" variant="elevated" elevation="12" @click="triggerFileUpload">Feltöltés</v-btn>
          <v-btn color="accent" variant="elevated" elevation="12" @click="downloadJson">Letöltés</v-btn>
          <v-btn color="success" variant="elevated" elevation="12" @click="save">Save</v-btn>
          <v-btn @click="pCloseDialog" color="danger" variant="elevated" elevation="12">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
