<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

const props = defineProps({
  activator: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: '900px'
  },
  color: {
    type: String,
    default: 'background'
  }
});

const dialog = defineModel('dialog', { type: Boolean });
</script>

<template>
  <v-dialog v-model="dialog" :activator="props.activator" :max-width="props.maxWidth" persistent>
    <v-card :color="props.color">
      <v-card-item>
        <v-card-title class="text-h5">
          <slot name="title"></slot>
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-end">
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
