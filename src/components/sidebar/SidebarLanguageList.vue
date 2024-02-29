<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed } from 'vue';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const isCurrentLocale = (id: string) => {
    return computed(() => i18n.getCurrentLocale.id === id).value;
};

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <v-list class="bg-background border-radius-8">
        <v-list-item :title="locale.name"
                     v-for="locale in i18n.getAllLocales"
                     :key="locale.id"
                     :value="locale.id"
                     :active="isCurrentLocale(locale.id)"
                     @click="i18n.switchLocale(locale.id)">
          <template v-slot:append>
            <v-btn icon
                   :color="isCurrentLocale(locale.id) ? 'success' : 'secondary'"
                     variant="elevated"
                   elevation="12"
                   size="small">
              <v-icon>{{ isCurrentLocale(locale.id) ? 'mdi-check-circle' : 'mdi-circle-off-outline' }}</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-btn density="compact" icon="mdi-plus" color="accent" variant="elevated" elevation="4"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
