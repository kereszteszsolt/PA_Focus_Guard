<script lang="ts">
import { useI18nStore } from '@/store/i18nStore';
export default {
  setup() {
    const i18nStore = useI18nStore();
    i18nStore.fetchLocaleSettingsAndMessages();

    return {
      i18nStore
    };
  }
};
</script>

<template>
  options
  {{ i18nStore.getTranslation('text') }}
</template>

<style scoped lang="scss">

</style>
