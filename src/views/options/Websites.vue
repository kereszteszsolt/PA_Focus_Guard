<script setup lang="ts">
import { useWebsiteRulesStore } from '@/store/websiteRulesStore';
import { IWebsiteRule } from '@/interfaces';
import EditWebsiteRuleDialog from '@/components/websites/EditWebsiteRuleDialog.vue';
import DeleteWebsiteRuleDialog from '@/components/websites/DeleteWebsiteRuleDialog.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18nStore } from '@/store';
import { msg } from '@/constants';
import { SidebarListItemMenu } from '@/components/common';

const websiteRulesStore = useWebsiteRulesStore();
const i18n = useI18nStore();
websiteRulesStore.fetchData();
i18n.fetchLocaleSettingsAndMessages();
const route = useRoute();
let dialog = ref(false);
let dialogDelete = ref(false);
let editingId = ref('');
let editingItem = ref(websiteRulesStore.getDummyWebsiteRule);
let isNewItem = ref(false);
let isValid = ref(false);
let page = ref(1);
let itemsPerPage = ref(5);

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
const isLoading = computed(() => websiteRulesStore.isLoading || i18n.isLoading);

const headers = computed(() => [
  { title: 'URL', value: 'url' },
  { title: t(msg.PERMANENTLY_ACTIVE), value: 'permanentlyActive' },
  { title: t(msg.TEMPORARILY_INACTIVE), value: 'temporarilyInactive' },
  { title: t(msg.ACTIONS), value: 'actions' }
  // ,
  // { title: t(msg.ORDER), value: 'order' },
  // { title: t(msg.GLOBAL_ORDER), value: 'globalOrder' }
]);

const pageText = computed(() => {
  const total = websiteRulesStore.getAllWebsiteRules.length;
  const pageStart = (page.value - 1) * itemsPerPage.value + 1;
  const pageStop = page.value * itemsPerPage.value > total ? total : page.value * itemsPerPage.value;
  const totalPages = Math.ceil(total / itemsPerPage.value);
  return `Page: ${page.value} of ${totalPages} , ${pageStart}-${pageStop} of ${total}`;
});

const formTitle = computed(() => {
  return editingId.value === '' ? 'New Item' : 'Edit Item';
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
  editingItem.value = {
    ...editingItem.value,
    listId: pathId.value
  };
  isNewItem.value = true;
  dialog.value = true;
};
const editItem = (id: string) => {
  const found = websiteRulesStore.getWebsiteRuleById(id);
  if (found) {
    editingItem.value = found;
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
    editingItem.value = found;
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
  editingItem.value = websiteRulesStore.getDummyWebsiteRule;
};
const closeDelete = () => {
  dialogDelete.value = false;
  editingId.value = '';
  editingItem.value = websiteRulesStore.getDummyWebsiteRule;
};
const save = (editedItem: IWebsiteRule) => {

  if (isNewItem.value) {
    websiteRulesStore.addWebsiteRule(editedItem);
    isNewItem.value = false;
  } else {
    websiteRulesStore.updateWebsiteRule(editingItem.value.id, editedItem);
  }
  closeEdit();
  console.log('save', editedItem);
};
</script>

<template>
  <div v-if="!isLoading">
    <v-data-table
      :headers="headers"
      :items="websiteRules"
      :sort-by="sortByFieldName"
      color="deep-purple-lighten-3"
      class="bg-background">
      <!--      :items-per-page-text="t(msg.ITEMS_PER_PAGE)"-->
      <!--      v-model:page="page"-->
      <!--      v-model:items-per-page="itemsPerPage"-->
      <!--      :items-per-page-options="[5, 7, 8]"-->
      <!--      :page-text="pageText"-->

      <template v-slot:item.url="{ item }">
        <div :style="{ minWidth: '350px', maxWidth: '480px', wordBreak: 'break-all', fontWeight: 700 }">
<!--          <a :href="item.url" target="_blank" :style="{fontWeight: 700}">-->
            {{ item.url }}
<!--          </a>-->
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <sidebar-list-item-menu
          :list-id="item.id"
          :edit-item="editItem"
          :delete-item="deleteItem"
          :move-up="moveUp"
          :move-down="moveDown"
          :t="t"
        />
      </template>
      <template v-slot:item.permanentlyActive="{ item }">
        <div class="fgCheckBoxCenter">
          <v-checkbox
            v-model="item.permanentlyActive"
            color="primary"
            @change="setPermanentlyActive(item)"
            hide-details>
          </v-checkbox>
        </div>
      </template>
      <template v-slot:item.temporarilyInactive="{ item }">
        <div class="fgCheckBoxCenter">
          <v-checkbox
            v-model="item.temporarilyInactive"
            color="primary"
            @change="setTemporarilyInactive(item)"
            hide-details>
          </v-checkbox>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Website List: {{ websiteRuleListName }}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn color="accent" @click="newItem" v-if="!showAll" variant="elevated">
            {{ t(msg.NEW_ITEM) }}
          </v-btn>
          <edit-website-rule-dialog
            :p-item="editingItem"
            :p-dialog="dialog"
            :p-close-dialog="closeEdit"
            :p-save-item="save"
            :p-is-new-item="isNewItem"
            :t="t"
          ></edit-website-rule-dialog>

          <delete-website-rule-dialog
            :p-is-empty=true
            :p-item="editingItem"
            :p-delete-item-confirm="deleteItemConfirm"
            :p-close-dialog="closeDelete"
            :p-dialog="dialogDelete"
            :t="t">
          </delete-website-rule-dialog>

        </v-toolbar>
      </template>
    </v-data-table>
  </div>
  <div v-else class="d-flex justify-center align-center fill-height">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<style lang="scss">
.v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > th {
  text-align: center;

  > .v-data-table-header__content {
    justify-content: space-around;
  }
}

.fgCheckBoxCenter {
  > .v-input {
      > .v-input__control {
        > .v-selection-control {
          display: flex;
          justify-content: space-around;
            > .v-selection-control__wrapper {
          }
        }
      }
  }
}
</style>
