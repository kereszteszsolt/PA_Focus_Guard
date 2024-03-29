<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed } from 'vue';
import * as utils from '@/utils';
import { ILocaleSettings } from '@/interfaces';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

const isCurrentLocale = (id: string) => {
    return computed(() => i18n.getCurrentLocaleId === id).value;
};

const allLocales = computed(() => i18n.getAllLocales);

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0 fgScroll" color="background">
    <v-list class="bg-background border-radius-8 fw-sidebar fgScroll">
        <v-list-item :title="locale.localeName"
                     v-for="locale in allLocales"
                     :key="locale.localeId"
                     :value="locale.localeId"
                     :active="isCurrentLocale(locale.localeId)"
                     @click="i18n.switchLocale(locale.localeId)">
          <template v-slot:append>
            <v-btn icon
                   :color="isCurrentLocale(locale.localeId) ? 'success' : 'secondary'"
                     variant="elevated"
                   elevation="12"
                   size="small">
              <v-icon>{{ isCurrentLocale(locale.localeId) ? 'mdi-check-circle' : 'mdi-circle-off-outline' }}</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-btn density="compact" icon="mdi-keyboard-backspace" color="accent" variant="elevated" elevation="4" to="/settings/settings"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
