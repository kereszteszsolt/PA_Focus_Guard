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
  pSaveLocaleMessages: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);
let jsonData = ref('');
let uploadedJsonData = ref<ILocaleMessages | null>(null);

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  jsonData.value = JSON.stringify(props.pLocaleMassages);
});

const downloadJson = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData.value);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "jsonData.json");
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
  if (file.type === "application/json") {
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

const dialogHeight = computed(() => {
  return uploadedJsonData.value ? '800px' : 'auto';
});

</script>

<template>
  <v-dialog v-model="dialog" max-width="900px"  persistent color="background">
    <v-card>
      <v-card-item>
        <v-card-title class="headline">Edit/Add Language</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-textarea v-model="jsonCode" rows="25"></v-textarea>
      </v-card-text>
      <v-card-text>
        <input type="file" id="fileUpload" @change="uploadFile" style="display: none" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" variant="elevated" elevation="12" @click="triggerFileUpload">Feltöltés</v-btn>
        <v-btn color="accent" variant="elevated" elevation="12"  @click="downloadJson">Letöltés</v-btn>
        <v-btn color="success" variant="elevated" elevation="12" @click="pSaveLocaleMessages(uploadedJsonData)">Save</v-btn>
        <v-btn @click="pCloseDialog" color="danger" variant="elevated" elevation="12" >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.tHeight {
  height: 500px
}
</style>
