<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed, nextTick, Ref, ref, UnwrapRef } from 'vue';
import { msg } from '@/constants';
import { EditCustomLanguageDialog } from '@/components/languages';
import * as utils from '@/utils';
import { CommonActionTreeDotsMenu } from '@/components/common';
import { IAction, ILocaleMessages } from '@/interfaces';
import { DeleteWebsiteRuleDialog } from '@/components/websites';
import DeleteLanguageDialog from '@/components/languages/DeleteLanguageDialog.vue';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

const isLoading = computed(() => i18n.isLoading);

const headers = computed(() => [
  { title: t(msg.CODE), value: 'localeId' },
  { title: t(msg.NAME), value: 'localeName' },
  { title: t(msg.DIRECTION), value: 'text_direction' },
  { title: t(msg.ACTIONS), value: 'actions' },
  { title: t(msg.CURRENT), value: 'is_current' },
  { title: t(msg.FALLBACK_1), value: 'isFallback1' },
  { title: t(msg.FALLBACK_2), value: 'isFallback2' },
  { title: t(msg.FACTORY_DEFAULT), value: 'isFactoryDefault' },
  { title: t(msg.LANGUAGE_TYPE), value: 'language_type' }
]);

const langActions: IAction[] = [
  {
    actionId: 'edit',
    f: (id: string) => {
      editLocale(id);
    },
    mdiIcon: 'mdi-pencil',
    color: 'warning',
    tooltip: msg.EDIT,
    vif: {
      func: (isBuiltIn: boolean) => !isBuiltIn,
      fieldName: 'isBuiltIn',
      value: false
    }
  },
  {
    actionId: 'delete',
    f: (id: string) => {
      openDeleteDialog(id);
    },
    mdiIcon: 'mdi-delete',
    tooltip: msg.DELETE,
    color: 'danger',
    vif: {
      func: (isBuiltIn: boolean) => !isBuiltIn,
      fieldName: 'isBuiltIn',
      value: false
    }
  },
  {
    actionId: 'download',
    f: (id: string) => {
      let lm = i18n.getLocaleMessagesById(id);
      if (lm) {
        utils.file.downloadAsJsonFile(JSON.stringify({
          locale: lm.locale,
          messages: lm.messages
        }, null, 2), `${lm.locale.id}_${lm.locale.name.trim().replace(/ /g, '_')}.json`);
      }
    },
    mdiIcon: 'mdi-download',
    tooltip: 'Download',
    color: 'primary'
  },
  {
    actionId: 'duplicate',
    f: (id: string) => {
      i18n.duplicateLocale(id);
    },
    mdiIcon: 'mdi-content-duplicate',
    tooltip: 'Duplicate',
    color: 'primary'
  }
];

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
const allLocales = computed(() => i18n.getAllLocales);
let editDialog = ref(false);
const deleteDialog = ref(false);
const deletingItemId = ref('');
let newItem = ref(false);
let page = ref(1);
let itemsPerPage = ref(10);
const totalPages = computed(() => {
  return Math.ceil(i18n.getAllLocales.length / itemsPerPage.value);
});
const totalVisiblePages = computed(() => {
  return totalPages.value > 5 ? 5 : totalPages.value;
});

const closeEditDialog = () => {
  itemForEdit.value = i18n.getDummyLocaleMessages;
  editDialog.value = false;
  newItem.value = true;
};
const itemForEdit = ref<ILocaleMessages>(i18n.getDummyLocaleMessages);
const defaultLocaleMassages = ref<ILocaleMessages>(i18n.getDefaultLocaleMessages || i18n.getDummyLocaleMessages);

const saveLocaleMessages = (localeMessages: any) => {
  if (newItem.value) {
    i18n.addNewLocale(localeMessages);
  } else {
    i18n.updateLocaleMessages(localeMessages);
  }
  editDialog.value = false;
  nextTick(() => {
    itemForEdit.value = i18n.getDummyLocaleMessages;
    newItem.value = true;
  });
};

const deleteLocale = (id: string) => {
  i18n.deleteLocale(id);
  closeDeleteDialog();
};

const openDeleteDialog = (id: string) => {
  deletingItemId.value = id;
  if (deletingItemId) {
    deleteDialog.value = true;
  }
};

const closeDeleteDialog = () => {
  deleteDialog.value = false;
  nextTick(() => {
    deletingItemId.value = '';
  });
};

const editLocale = (id: string) => {
  let allLocaleSettings = i18n.getAllLocales;
  let allLocaleMessages = i18n.getAllLocaleMessages;
  allLocaleSettings.forEach((item) => {
  });
  allLocaleMessages.forEach((item) => {
  });
  let edit = i18n.getLocaleMessagesById(id);
  let defaultLocale = i18n.getDefaultLocaleMessages;
  if (edit !== undefined && defaultLocale !== undefined) {
    itemForEdit.value = edit;
    defaultLocaleMassages.value = defaultLocale;
    editDialog.value = true;
    newItem.value = false;
  } else {
    //TODO: Add error message
  }
};
const newLocale = () => {
  let edit = i18n.getDummyLocaleMessages;
  let defaultLocale = i18n.getDefaultLocaleMessages;
  if (edit && defaultLocale) {
    itemForEdit.value = edit;
    defaultLocaleMassages.value = defaultLocale;
    editDialog.value = true;
    newItem.value = true;
  } else {
    //TODO: Add error message
  }
};

</script>

<template>
  <div class="flex-1-0 border-top-radius-8" v-if="!isLoading">
    <v-data-table
      :headers="headers"
      :items="allLocales"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      class="bg-background"
    >
      <template v-slot:item.localeId="{ item }">
        <div class="text-center">
          {{ item.localeId }}
        </div>
      </template>
      <template v-slot:item.localeName="{ item }">
        <div class="text-center">
          {{ item.localeName }}
        </div>
      </template>
      <template v-slot:item.text_direction="{ item }">
        <div class="text-center">
          {{ item.text_direction }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <common-action-tree-dots-menu :actions="langActions" :t="t" :item="item"></common-action-tree-dots-menu>
      </template>
      <template v-slot:item.is_current="{ item }">
        <v-checkbox
          v-model="item.isCurrent"
          color="warning"
          @change="i18n.switchLocale(item.localeId)"
          hide-details
          class="d-flex justify-center"
        >
        </v-checkbox>
      </template>
      <template v-slot:item.isFallback1="{ item }">
        <v-checkbox
          v-model="item.isFallback1"
          color="warning"
          @change="i18n.setFallback1(item.localeId)"
          hide-details
          class="d-flex justify-center"
        >
        </v-checkbox>
      </template>
      <template v-slot:item.isFallback2="{ item }">
        <v-checkbox
          v-model="item.isFallback2"
          color="warning"
          @change="i18n.setFallback2(item.localeId)"
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
        <div class="text-center">{{ item.isBuiltIn ? t(msg.BUILT_IN) : t(msg.CUSTOM) }}</div>
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
              @click="newLocale"
            >
              {{ t(msg.ADD) }}
            </v-btn>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:bottom>
        <v-sheet color="background" class="d-flex justify-space-between">

          <v-pagination
            v-model="page"
            :length="totalPages"
            :total-visible="totalVisiblePages"
            rounded="circle"
          ></v-pagination>

          <v-label :style="{paddingRight: '24px', fontWeight: '500'}">{{ t(msg.TOTAL_NR_OF_ITEMS) }}
            {{ allLocales.length }}
          </v-label>

        </v-sheet>
      </template>
    </v-data-table>
    <edit-custom-language-dialog :t="t" :p-close-dialog="closeEditDialog" :p-dialog="editDialog"
                                 :p-locale-massages="itemForEdit"
                                 :p-save-locale-messages="saveLocaleMessages"
                                 :p-default-locale-massages="defaultLocaleMassages"
                                 :p-check-if-locale-exists="i18n.checkIfLocaleExists"
                                 :p-new-item="newItem"
    ></edit-custom-language-dialog>
    <delete-language-dialog :p-dialog="deleteDialog" :p-close-dialog="closeDeleteDialog"
                                :p-confirm-delete="deleteLocale" :p-item-id="deletingItemId" :t="t">
    </delete-language-dialog>
  </div>
  <div v-else class="d-flex justify-center align-center fill-height">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<style scoped lang="scss">

</style>
