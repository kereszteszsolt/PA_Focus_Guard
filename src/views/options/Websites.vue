<script setup lang="ts">
import { useWebsiteRulesStore } from '@/store/websiteRulesStore';
import { IWebsiteRule } from '@/interfaces';
import { EditWebsiteRuleDialog } from '@/components/websites';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18nStore } from '@/store';
import { msg } from '@/constants';
import { CommonCrudMenu, FgDialog } from '@/components/common';
import * as utils from '@/utils';

const websiteRulesStore = useWebsiteRulesStore();
const i18n = useI18nStore();
websiteRulesStore.fetchData();
i18n.fetchLocaleSettingsAndMessages();
const t = (key: string) => computed(() => i18n.getTranslation(key)).value;

utils.runtimeMessages.createBatchMessageListenerM2O(['websiteRulesUpdated', 'websiteRuleListsUpdated'], () => {
  websiteRulesStore.fetchData();
});
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

const route = useRoute();
let dialog = ref(false);
const dialogDelete = ref(false);
let editingId = ref('');
const contextItem = ref(websiteRulesStore.getDummyWebsiteRule);
let isNewItem = ref(false);
let isValid = ref(false);
let page = ref(1);
let itemsPerPage = ref(8);
let itemsPerPageOptions = computed(() => [
  { value: 3, title: '3' },
  { value: 5, title: '5' },
  { value: 8, title: '8' },
  { value: 13, title: '13' },
  { value: 21, title: '21' },
  { value: 34, title: '34' },
  { value: -1, title: t(msg.ALL) }
]);

const isLoading = computed(() => websiteRulesStore.isLoading || i18n.isLoading);

const headers = computed(() => [
  { title: 'URL', value: 'url' },
  { title: t(msg.PERMANENTLY_ACTIVE), value: 'permanentlyActive' },
  { title: t(msg.TEMPORARILY_INACTIVE), value: 'temporarilyInactive' },
  { title: t(msg.ACTIONS), value: 'actions' }
]);

const totalPages = computed(() => {
  return Math.ceil(((pathId.value === 'all' || !pathId.value) ?
    websiteRulesStore.getAllWebsiteRules :
    websiteRulesStore.getWebsiteRulesByListId(pathId.value)).length / itemsPerPage.value);
});

const totalVisiblePages = computed(() => {
  return totalPages.value > 5 ? 5 : totalPages.value;
});

const pathId = computed(() => {
  return route.params.id as string;
});

const showAll = computed(() => {
  return pathId.value === 'all' || !pathId.value;
});

const moveUp = computed(() => {
  return pathId.value === 'all' ? websiteRulesStore.moveUpWebsiteRulesGlobalOrder : websiteRulesStore.moveUpWebsiteRule;
});

const moveDown = computed(() => {
  return pathId.value === 'all' ? websiteRulesStore.moveDownWebsiteRulesGlobalOrder : websiteRulesStore.moveDownWebsiteRule;
});

type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }
const sortByFieldName = computed<readonly SortItem[]>(() => {
  return pathId.value === 'all' ? [{ key: 'globalOrder', order: 'asc' }] : [{ key: 'order', order: 'asc' }];
});

const websiteRuleList = computed(() => {
  return websiteRulesStore.getWebsiteRuleListById(pathId.value);
});

const websiteRuleListName = computed(() => {
  return (pathId.value === 'all' || !pathId.value) ?
    'All Websites' : websiteRuleList.value?.name;
});

const websiteRules = computed(() => {
  return (pathId.value === 'all' || !pathId.value) ?
    websiteRulesStore.getAllWebsiteRules :
    websiteRulesStore.getWebsiteRulesByListId(pathId.value);
});

const setPermanentlyActive = (item: IWebsiteRule) => {
  item.temporarilyInactive = item.permanentlyActive ? false : item.temporarilyInactive;
  websiteRulesStore.saveWebsiteRules();
};
const setTemporarilyInactive = (item: IWebsiteRule) => {
  item.permanentlyActive = item.temporarilyInactive ? false : item.permanentlyActive;
  websiteRulesStore.saveWebsiteRules();
};

const newItem = () => {
  contextItem.value = {
    ...contextItem.value,
    listId: pathId.value
  };
  isNewItem.value = true;
  dialog.value = true;
};
const editItem = (id: string) => {
  const found = websiteRulesStore.getWebsiteRuleById(id);
  if (found) {
    contextItem.value = found;
    dialog.value = true;
  } else {
    console.error('Website not found');
    // throw new Error('Website not found');  TODO - handle error
  }
};
const deleteItem = (id: string) => {
  const found = websiteRulesStore.getWebsiteRuleById(id);
  if (found) {
    editingId.value = found.id;
    contextItem.value = found;
    dialogDelete.value = true;
  } else {
    console.error('Website not found');
    // throw new Error('Website not found');  TODO - handle error
  }
};
const deleteItemConfirm = () => {
  websiteRulesStore.deleteWebsiteRule(editingId.value);
  closeDelete();
};
const closeEdit = () => {
  dialog.value = false;
  editingId.value = '';
  contextItem.value = websiteRulesStore.getDummyWebsiteRule;
};
const closeDelete = () => {
  dialogDelete.value = false;
  editingId.value = '';
  contextItem.value = websiteRulesStore.getDummyWebsiteRule;
};
const save = (editedItem: IWebsiteRule) => {

  if (isNewItem.value) {
    websiteRulesStore.addWebsiteRule(editedItem);
    isNewItem.value = false;
  } else {
    websiteRulesStore.updateWebsiteRule(contextItem.value.id, editedItem);
  }
  closeEdit();
};
</script>

<template>
  <div class="flex-1-0">
    <div class="border-radius-8 fgScroll fw-card">
      <div class="fgScroll fw-card">
        <v-data-table
          :headers="headers"
          :items="websiteRules"
          item-key="id"
          :sort-by="sortByFieldName"
          class="bg-background fgScroll"
          v-model:page="page"
          v-model:items-per-page="itemsPerPage"
          :items-per-page-options="itemsPerPageOptions"
          :items-per-page-text="t(msg.ITEMS_PER_PAGE)"
          :footer-props="{ showFirstLastPage: true }"
          :show-current-page="true"
          :page-text="`${page} / ${totalPages}`"
          :no-data-text="t(msg.NO_WEBSITE_RULES_FOUND)"
          :loading="isLoading"
        >
          <template v-slot:item.url="{ item }">
            <div :style="{ minWidth: '350px', maxWidth: '480px', overflow: 'hidden', wordWrap: 'break-word',
        textOverflow: 'ellipsis',  whiteSpace: 'nowrap', fontWeight: 500 }">
              {{ item.urlFilter }}
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-space-around">
              <common-crud-menu
                :list-id="item.id"
                :edit-item="editItem"
                :delete-item="deleteItem"
                :move-up="moveUp"
                :move-down="moveDown"
                :t="t"
              />
            </div>
          </template>
          <template v-slot:item.permanentlyActive="{ item }">
            <v-checkbox
              v-model="item.permanentlyActive"
              color="primary"
              @change="setPermanentlyActive(item)"
              hide-details
              class="d-flex justify-center"
            >
            </v-checkbox>
          </template>
          <template v-slot:item.temporarilyInactive="{ item }">
            <v-checkbox
              v-model="item.temporarilyInactive"
              color="primary"
              @change="setTemporarilyInactive(item)"
              hide-details
              class="d-flex justify-center"
            >
            </v-checkbox>
          </template>
          <template v-slot:top>
            <v-toolbar flat class="border-top-radius-8">
              <v-toolbar-title>{{ websiteRuleListName }}</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-btn color="accent" @click="newItem" v-if="!showAll" variant="elevated" elevation="12">
                {{ t(msg.NEW_ITEM) }}
              </v-btn>

            </v-toolbar>
          </template>
          <!--          <template v-slot:bottom>-->
          <!--            <v-sheet color="background" class="d-flex justify-space-between">-->

          <!--              <v-pagination-->
          <!--                v-model="page"-->
          <!--                :length="totalPages"-->
          <!--                :total-visible="totalVisiblePages"-->
          <!--                rounded="circle"-->
          <!--              ></v-pagination>-->

          <!--              <v-select-->
          <!--                v-model="itemsPerPage"-->
          <!--                :items="[3, 5, 7, websiteRules.length]"-->
          <!--                label="Items per page"-->
          <!--                density="compact"></v-select>-->

          <!--              <v-label :style="{paddingRight: '24px', fontWeight: '500'}">{{ t(msg.TOTAL_NR_OF_ITEMS) }}-->
          <!--                {{ websiteRules.length }}-->
          <!--              </v-label>-->

          <!--            </v-sheet>-->
          <!--          </template>-->
        </v-data-table>
      </div>
    </div>

    <edit-website-rule-dialog
      :p-item="contextItem"
      :p-dialog="dialog"
      :p-close-dialog="closeEdit"
      :p-save-item="save"
      :p-is-new-item="isNewItem"
      :t="t"
    ></edit-website-rule-dialog>

    <fg-dialog
      v-model:dialog="dialogDelete"
      activator="#deleteWsRule"
      :title="t(msg.DELETE_WEBSITE_RULE)"
      :main-text="t(msg.ARE_YOU_SURE_DELETE_THIS_WEBSITE_RULE)"
      :main-text-item="contextItem.urlFilter"
      :actions="[
      { key: msg.DELETE, name: t(msg.DELETE), clickHandler: deleteItemConfirm, color: 'danger' },
      { key: msg.CANCEL, name: t(msg.CANCEL), clickHandler: closeDelete, color: 'success' }
    ]"
    >
    </fg-dialog>
  </div>
</template>

<style lang="scss">
.v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > th {
  text-align: center;

  > .v-data-table-header__content {
    justify-content: space-around;
  }
}
</style>
