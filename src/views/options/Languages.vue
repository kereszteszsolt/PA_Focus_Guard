<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed, ref } from 'vue';
import { msg } from '@/constants';
import { EditCustomLanguageDialog } from '@/components/languages';
import * as utils from '@/utils';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

const isLoading = computed(() => i18n.isLoading);

const headers = computed(() => [
  { title: 'Code', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Direction', value: 'text_direction' },
  { title: 'Actions', value: 'actions' },
  { title: 'Current', value: 'is_current' },
  { title: 'Fallback-1', value: 'isFallback1' },
  { title: 'Fallback-2', value: 'isFallback2' },
  { title: 'Factory Default', value: 'isFactoryDefault' },
  { title: 'Language Type', value: 'language_type' }
]);

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
const allLocales = computed(() => i18n.getAllLocales);
let editDialog = ref(false);
const closeEditDialog = () => {
  editDialog.value = false;
};
const itemForEdit = computed(() => i18n.getLocaleMessagesByLocaleId('en'));

const saveLocaleMessages = (localeMessages: any) => {
  i18n.addNewLocale(localeMessages);
};

const deleteLocale = (id: string) => {
  i18n.deleteLocale(id);
};

</script>

<template>
  <div class="flex-1-0 border-top-radius-8" v-if="!isLoading">
    <v-data-table
      :headers="headers"
      :items="allLocales"
      class="bg-background"
    >
      <template v-slot:item.id="{ item }">
        <div class="text-center">
          {{ item.id }}
        </div>
      </template>
      <template v-slot:item.name="{ item }">
        <div class="text-center">
          {{ item.name }}
        </div>
      </template>
      <template v-slot:item.text_direction="{ item }">
        <div class="text-center">
          {{ item.text_direction }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon

          class="cursor-pointer"
          color="danger"
          v-if="item.isBuiltIn === false"
          @click="deleteLocale(item.id)"
        >
          mdi-delete
        </v-icon>
        <v-icon
          class="cursor-pointer"
          color="primary"
          @click="utils.file.downloadAsJsonFile(JSON.stringify(i18n.getLocaleMessagesByLocaleId(item.id), null, 2), item.id + '.json')"
        >
          mdi-download
        </v-icon>
      </template>
      <template v-slot:item.is_current="{ item }">
          <v-checkbox
            v-model="item.isCurrent"
            color="warning"
            @change="i18n.switchLocale(item.id)"
            hide-details
            class="d-flex justify-center"
          >
          </v-checkbox>
      </template>
      <template v-slot:item.isFallback1="{ item }">
          <v-checkbox
            v-model="item.isFallback1"
            color="warning"
            @change="i18n.setFallback1(item.id)"
            hide-details
            class="d-flex justify-center"
          >
          </v-checkbox>
      </template>
      <template v-slot:item.isFallback2="{ item }">
          <v-checkbox
            v-model="item.isFallback2"
            color="warning"
            @change="i18n.setFallback2(item.id)"
            hide-details
            class="d-flex justify-center"
          >
          </v-checkbox>
      </template>
      <template v-slot:item.isFactoryDefault="{ item }">
          <v-checkbox
            v-model="item.isFactoryDefault"
            color="primary"
            :disabled="true"
            hide-details
            class="d-flex justify-center"
          >
          </v-checkbox>
      </template>
      <template v-slot:item.language_type="{ item }">
        <div class="text-center">{{ item.isBuiltIn ? 'Build-In' : 'Custom' }}</div>
      </template>
      <template v-slot:top>
        <v-toolbar flat class="border-top-radius-8">
          <v-toolbar-title>{{ t(msg.LANGUAGES) }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <div class="d-flex justify-space-between px-4">
            <v-btn
              color="warning"
              variant="elevated"
              elevation="12"
              class="ml-4"
              @click="i18n.resetBackToFactoryDefault"
            >
              {{ t(msg.RESET) }}
            </v-btn>
            <v-btn
              color="accent"
              variant="elevated"
              elevation="12"
              class="ml-4"
              @click="editDialog = true"
            >
              {{ t(msg.ADD) }}
            </v-btn>
          </div>
        </v-toolbar>
      </template>
    </v-data-table>
    <edit-custom-language-dialog :t="t" :p-close-dialog="closeEditDialog" :p-dialog="editDialog"
                                 :p-locale-massages="itemForEdit"
                                 :p-save-locale-messages="saveLocaleMessages"></edit-custom-language-dialog>
  </div>
  <div v-else class="d-flex justify-center align-center fill-height">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<style scoped lang="scss">

</style>
