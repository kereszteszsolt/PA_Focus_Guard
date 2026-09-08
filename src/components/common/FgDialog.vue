<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
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
  mainText: {
    type: String,
    default: ''
  },
  mainTextItem: {
    type: String,
    default: ''
  },
  secondaryText: {
    type: String,
    default: ''
  },
  secondaryTextItem: {
    type: String,
    default: ''
  },
  textDivider: {
    type: Boolean,
    default: true
  },
  actions: {
    type: Array as () => IDialogAction[],
    default: []
  }
});

const dialog = defineModel('dialog', { type: Boolean });
</script>

<template>
  <v-dialog v-model="dialog" :activator="props.activator" :max-width="props.maxWidth" persistent>
    <v-card :color="props.color" class="fg-dialog-card">
      <v-card-item>
        <v-card-title>
          <div v-if="props.title">{{ props.title }}</div>
          <slot name="title"></slot>
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <div class="d-flex flex-column text-body-1" v-if="$slots['main_text'] || props.mainText">
          <div v-if="props.mainText">{{ props.mainText }}</div>
          <slot name="main_text"></slot>
          <div v-if="$slots['main_text_item'] || props.mainTextItem" class="d-flex flex-row">
            <v-icon>mdi-chevron-double-right</v-icon>
            <div v-if="props.mainTextItem">{{ props.mainTextItem }}</div>
            <slot name="main_text_item"></slot>
            <v-icon>mdi-chevron-double-left</v-icon>
          </div>
        </div>
        <v-divider class="mx-1 my-2" v-if="($slots['secondary_text'] || props.secondaryText) && props.textDivider"></v-divider>
        <div class="d-flex flex-column text-body-1" v-if="$slots['secondary_text'] || props.secondaryText">
          <div v-if="props.secondaryText">{{ props.secondaryText }}</div>
          <slot name="secondary_text"></slot>
          <div v-if="props.secondaryTextItem">{{ props.secondaryTextItem }}</div>
          <slot name="secondary_text_item"></slot>
        </div>
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
  </v-dialog>
</template>

<style scoped lang="scss">
.v-dialog .v-card.fg-dialog-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  border-radius: 12px;

  :deep(.v-card-item) {
    padding: 20px 20px 8px;
  }

  :deep(.v-card-title) {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    white-space: normal;
  }

  :deep(.v-card-text) {
    padding: 16px 20px;
    line-height: 1.6;
  }

  :deep(.v-card-actions) {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 20px 20px;
  }

  :deep(.v-card-actions .v-btn--variant-elevated) {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.18) !important;
  }
}
</style>
