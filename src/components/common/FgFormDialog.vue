<script setup lang="ts">
import { defineProps, defineModel } from 'vue';
import { IDialogAction } from '@/interfaces';

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
  },
  title: {
    type: String,
    default: ''
  },
  actions: {
    type: Array as () => IDialogAction[],
    default: []
  }
});

const dialog = defineModel('dialog', { type: Boolean });
const isValid = defineModel('valid', { type: Boolean });

</script>

<template>
  <v-dialog v-model="dialog" :activator="props.activator" :max-width="props.maxWidth" persistent>
    <v-form v-model="isValid" @keydown.enter.prevent>
      <v-card :color="props.color">
        <v-card-item>
          <v-card-title class="text-h5">
            <div v-if="props.title">{{ props.title }}</div>
            <slot name="title"></slot>
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            v-for="action in props.actions"
            :key="action.key"
            @click="action.clickHandler"
            :color="action?.color || 'primary'"
            :variant="action?.variant ||'elevated'"
            :elevation="action?.elevation || 8"
            :disabled="action?.disabled || false"
          >
            {{ action.name }}
          </v-btn>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
