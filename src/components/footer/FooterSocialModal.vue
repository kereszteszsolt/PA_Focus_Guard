<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card color="background">
      <v-card-title class="text-h5">{{ socialMediaLink.platform }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <p class="font-weight-bold">{{ t(msg.THANK_Y4Y_INTEREST) }}</p>
          <p>{{t(msg.NOT_PART_OF_EXTENSION)}}</p>
          <p>{{ t(msg.CLICK_OPEN_NEW_TAB)}}</p>
          <p>
            <span class="font-weight-bold fgc-primary">{{socialMediaLink.name}}</span>&nbsp;
            <span class="font-weight-bold fgc-accent">{{socialMediaLink.identifier}}</span>&nbsp;
            <a :href="socialMediaLink.url" target="_blank">{{socialMediaLink.url}}</a>
          </p>
          <p>{{socialMediaLink.description}}</p>
          <p>{{t(socialMediaLink.instruction)}}</p>
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
import { msg } from '@/constants';

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
