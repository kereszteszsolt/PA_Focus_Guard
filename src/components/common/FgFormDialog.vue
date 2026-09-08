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
      <v-card :color="props.color" class="fg-dialog-card">
        <v-card-item>
          <v-card-title>
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
