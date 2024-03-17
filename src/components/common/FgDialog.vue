<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
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
        <div class="d-flex flex-column text-body-1" v-if="$slots['main_text']">
          <slot name="main_text"></slot>
          <div v-if="$slots['main_text_item']">
            <v-icon>mdi-chevron-double-right</v-icon>
            <slot name="main_text_item"></slot>
            <v-icon>mdi-chevron-double-left</v-icon>
          </div>
        </div>
        <div class="d-flex flex-column text-body-1" v-if="$slots['secondary_text']">
          <v-divider class="mx-1 my-2"></v-divider>
          <slot name="secondary_text"></slot>
          <slot name="secondary_text_item"></slot>
        </div>
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
