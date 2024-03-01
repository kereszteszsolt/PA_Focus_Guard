<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed } from 'vue';
import { msg } from '@/constants';

const i18n = useI18nStore();

const isLoading = computed(() => i18n.isLoading);

const headers = computed(() => [
  { title: 'Code', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Direction', value: 'text_direction' },
  { title: 'Actions', value: 'actions' },
  { title: 'Current', value: 'is_current' },
  { title: 'CustomFallback', value: 'custom_fallback' },
  { title: 'BuiltInFallback', value: 'built_in_fallback' },
  { title: 'LanguageType', value: 'language_type' }
]);

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;

</script>

<template>
  <div class="flex-1-0" v-if="!isLoading">
    <v-data-table
      :headers="headers"
      :items="i18n.getAllLocales"
      class="bg-background"
    >
      <template v-slot:item.id="{ item }">
        <div class="text-center">
          {{ item.id }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon

          class="cursor-pointer"
          color="danger"
          v-if="item.isBuiltIn === false"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.is_current="{ item }">
        <v-icon
          class="cursor-pointer"
          color="accent"
        >
          mdi-check
        </v-icon>
      </template>
      <template v-slot:item.custom_fallback="{ item }">
        <v-icon
          class="cursor-pointer"
          color="accent"
        >
          mdi-check
        </v-icon>
      </template>
      <template v-slot:item.built_in_fallback="{ item }">
        <v-icon
          class="cursor-pointer"
          color="accent"
        >
          mdi-check
        </v-icon>
      </template>
      <template v-slot:item.language_type="{ item }">
        <v-icon
          class="cursor-pointer"
          color="accent"
        >
          mdi-check
        </v-icon>
      </template>
      <template v-slot:top class="border-top-radius-8">
        <v-toolbar flat>
          <v-toolbar-title>{{ t(msg.LANGUAGES) }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <divc class="d-flex justify-space-between px-4">
            <v-btn
              color="warning"
              variant="elevated"
              elevation="12"
              class="ml-4"
            >
              {{ t(msg.RESET) }}
            </v-btn>
            <v-btn
              color="accent"
              variant="elevated"
              elevation="12"
              class="ml-4"
            >
              {{ t(msg.ADD) }}
            </v-btn>
          </divc>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
  <div v-else class="d-flex justify-center align-center fill-height">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<style scoped lang="scss">

</style>
