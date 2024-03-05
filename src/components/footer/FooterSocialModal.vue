<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card color="background">
      <v-card-title class="text-h5">{{ socialMediaLink.platform }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <p class="font-weight-bold">Köszönöm az érdeklődést!</p>
          <p>A kívánt oldal nem a bővítmény része!</p>
          <p>A linkre való kattintással megnyithatod egy új fülön.</p>
          <p>
            <span class="font-weight-bold">{{socialMediaLink.name}}</span>
            (<span class="font-weight-bold">{{socialMediaLink.identifier}}</span>) :
            <a :href="socialMediaLink.url" target="_blank">{{socialMediaLink.url}}</a>
          </p>
          <p>{{socialMediaLink.description}}</p>
          <p>{{socialMediaLink.instruction}}</p>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn color="danger" variant="elevated" elevation="12" @click="pCloseDialog">Close</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
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

<style scoped lang="scss">
/* Add your scoped styles here */
</style>
