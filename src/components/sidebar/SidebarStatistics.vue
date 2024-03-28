<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed } from 'vue';
import { msg } from '@/constants';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">

    <v-list class="bg-background border-radius-8 flex-1-0">
      <router-link to="/statistics/distraction-attempts" class="router-link">
        <v-list-item color="primary" :value="'distraction-attempts'">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar-stacked"></v-icon>
          </template>
          <v-list-item-title v-text="t(msg.DISTRACTION_ATTEMPTS)"></v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/statistics/data-usage" class="router-link">
        <v-list-item color="primary" :value="'data-usage'">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-donut"></v-icon>
          </template>
          <v-list-item-title v-text="t(msg.DATA)"></v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.router-link{
  text-decoration: none;
  color: inherit;
}
</style>
