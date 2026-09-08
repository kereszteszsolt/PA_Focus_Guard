<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="footer-page">
    <v-card class="footer-page__card border-top-radius-8 border-bottom-radius-0" color="background" elevation="0">
      <v-card-item class="footer-page__header">
        <v-card-title class="footer-page__title">{{ title }}</v-card-title>
      </v-card-item>
      <v-card-text class="footer-page__body fgScroll">
        <slot></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.footer-page {
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 700px;

  &__card {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__header {
    flex-shrink: 0;
    padding: 20px 20px 12px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    white-space: normal;
  }

  &__body {
    min-height: 0;
    padding: 0 20px 20px;
    font-size: 14px;
    line-height: 1.65;

    :deep(.v-list) {
      background: transparent !important;
    }

    :deep(> .v-list) {
      padding: 0;
      border: 1px solid rgba(var(--v-theme-primary), 0.22);
      border-radius: 12px;
      background: rgba(var(--v-theme-primary), 0.025) !important;
    }

    :deep(.v-list-item) {
      padding: 14px 16px;
      margin: 0;
      border: 0;
    }

    :deep(.v-list-item + .v-list-item) {
      border-top: 1px solid rgba(var(--v-theme-primary), 0.12);
    }

    :deep(.v-list-item-title) {
      margin-bottom: 6px;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      white-space: normal;
    }

    :deep(.v-list-item-subtitle) {
      white-space: normal;
    }

    :deep(a) {
      overflow-wrap: anywhere;
      text-underline-offset: 3px;
    }

    :deep(.v-expansion-panels) {
      margin-bottom: 8px;
    }

    :deep(.v-expansion-panel) {
      border: 1px solid rgba(var(--v-theme-primary), 0.22);
      border-radius: 12px;
      overflow: hidden;
    }

    :deep(.v-expansion-panel__shadow) {
      box-shadow: none;
    }

    :deep(.v-expansion-panel-title) {
      padding: 16px;
      line-height: 1.5;
    }
  }
}
</style>
