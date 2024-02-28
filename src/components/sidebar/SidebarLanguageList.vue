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
  <v-sheet class="sidebar-language border-radius-8" color="background">
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
                   size="small">
              <v-icon>{{ isCurrentLocale(locale.id) ? 'mdi-check-circle' : 'mdi-circle-off-outline' }}</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-btn density="compact" icon="mdi-plus" color="accent" variant="elevated"></v-btn>
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
.fgl-active {
  background-color: #15440a;
}
.fgl-inactive {
  background-color: #bb1414;
}
</style>
