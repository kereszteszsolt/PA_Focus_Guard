<script setup lang="ts">
import { useWebsiteRulesStore } from '@/store/websiteRulesStore';
import { IWebsiteRule } from '@/interfaces';
import EditWebsiteRuleDialog from '@/components/websites/EditWebsiteRuleDialog.vue';
import DeleteWebsiteRuleDialog from '@/components/websites/DeleteWebsiteRuleDialog.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const websiteRulesStore = useWebsiteRulesStore();
websiteRulesStore.fetchData();
const route = useRoute();
let dialog = ref(false);
let dialogDelete = ref(false);
let editingId = ref('');
let editingItem = ref(websiteRulesStore.getDummyWebsiteRule);
let isNewItem = ref(false);
let isValid = ref(false);

const headers = [
  { title: 'URL', value: 'url' },
  { title: 'Permanently Active', value: 'permanentlyActive' },
  { title: 'Temporarily Inactive', value: 'temporarilyInactive' },
  { title: 'Actions', value: 'actions' },
  { title: 'Order', value: 'order' },
  { title: 'Global Order', value: 'globalOrder' }
];

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
const deleteItem = (item: IWebsiteRule) => {
  const found = websiteRulesStore.getWebsiteRuleById(item.id);
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
  <div v-if="!websiteRulesStore.isLoading">
    <v-data-table
      :headers="headers"
      :items="websiteRules"
      :sort-by="sortByFieldName"
      class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        <v-icon small @click="editItem(item.id)">mdi-pencil</v-icon>
        <v-icon small @click="moveUp(item.id)">mdi-arrow-up</v-icon>
        <v-icon small @click="moveDown(item.id)">mdi-arrow-down</v-icon>
      </template>
      <template v-slot:item.permanentlyActive="{ item }">
        <v-checkbox
          v-model="item.permanentlyActive"
          color="primary"
          @change="setPermanentlyActive(item)"
          hide-details>
        </v-checkbox>
      </template>
      <template v-slot:item.temporarilyInactive="{ item }">
        <v-checkbox
          v-model="item.temporarilyInactive"
          color="primary"
          @change="setTemporarilyInactive(item)"
          hide-details>
        </v-checkbox>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Website List: {{ websiteRuleListName }}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn color="primary" @click="newItem" v-if="!showAll">
            New Item
          </v-btn>
          <edit-website-rule-dialog
            :p-item="editingItem"
            :p-dialog="dialog"
            :p-close-dialog="closeEdit"
            :p-save-item="save"
            :p-is-new-item="isNewItem"
          ></edit-website-rule-dialog>

          <delete-website-rule-dialog
            :p-is-empty=true
            :p-item="editingItem"
            :p-delete-item-confirm="deleteItemConfirm"
            :p-close-dialog="closeDelete"
            :p-dialog="dialogDelete">
          </delete-website-rule-dialog>

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
