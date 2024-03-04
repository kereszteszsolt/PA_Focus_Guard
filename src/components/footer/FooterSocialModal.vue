<script setup lang="ts">
import { ref, watch } from 'vue';
import { ISocialMediaLink } from '@/interfaces';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  socialMediaLink: {
    type: Object as () => ISocialMediaLink,
    required: true
  },
  pCloseDialog: {
    type: Function,
    required: true
  },
  t: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);

watch(() => props.pDialog, (value) => {
  dialog.value = value;
});

</script>

<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card color="background">
      <v-card-title class="text-h5">{{ socialMediaLink.platform }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-img :src="socialMediaLink.url" aspect-ratio="1"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="socialMediaLink.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="socialMediaLink.identifier" label="Identifier"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="socialMediaLink.description" label="Description"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="socialMediaLink.instruction" label="Instruction"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="danger" variant="elevated" elevation="12" @click="pCloseDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
