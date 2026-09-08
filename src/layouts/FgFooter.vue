<script setup lang="ts">
import { computed } from 'vue';
import FooterAttribution from '@/components/common/FooterAttribution.vue';
import { useI18nStore } from '@/store';
import { footerViewLinks } from '@/links/footerViewLinks';
import * as utils from '@/utils';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;

utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

</script>

<template>
  <v-sheet color="background" class="app-footer border-bottom-radius-8 px-4 py-2">
    <nav class="app-footer__navigation">
      <v-btn
        v-for="link in footerViewLinks" :key="link.id" :to="link.url" variant="text" density="compact" size="small"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular" color="info">
        {{ tr(link.title) }}
      </v-btn>
    </nav>
    <footer-attribution />
  </v-sheet>
</template>

<style scoped lang="scss">
.app-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 80px;

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 4px;
  }
}
</style>
