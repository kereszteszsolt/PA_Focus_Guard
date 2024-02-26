<script setup lang="ts">
import { useI18nStore } from '@/store';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

</script>

<template>
  <v-sheet class="sidebar-language" color="background">
    <v-list>
      <router-link v-for="locale in i18n.getAllLocales" :key="locale.id"
                   :to="{ name: 'LanguagesByLanguageId', params: { id: locale.id } }" class="router-link">
        <v-list-item :title="locale.name" :value="locale.id"></v-list-item>
      </router-link>
      <v-divider></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-btn density="compact" icon="mdi-plus"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <router-link :to="{ name: 'LanguagesByLanguageId', params: { id: 'all' } }" class="router-link">
        <v-list-item title="All Languages" value="all"></v-list-item>
      </router-link>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.sidebar-language {
  height: 100%;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
