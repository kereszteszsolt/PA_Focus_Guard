<script setup lang="ts">
defineProps({
  activator: {
    type: String,
    required: true
  },
  maxWidth: {
    type: String,
    default: '900px'
  },
  color: {
    type: String,
    default: 'background'
  },
  closeBtnColor: {
    type: String,
    default: 'danger'
  },
  closeBtnText: {
    type: String,
    default: 'Close'
  }
});

const dialog = defineModel('dialog', { type: Boolean });

</script>

<template>
  <v-dialog v-model="dialog" :max-width="maxWidth" persistent>
      <v-card :color="color">
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
