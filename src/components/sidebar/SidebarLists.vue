<script setup lang="ts">
import { useI18nStore, useWebsiteRulesStore } from '@/store';
import { IWebsiteRuleList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import { EditWebsiteRuleListDialog, DeleteWebsiteRuleListDialog } from '@/components/websites';
import { computed, nextTick, ref } from 'vue';
import { msg } from '@/constants';
import * as utils from '@/utils';
import { FgModal } from '@/components/common';

const websiteRulesStore = useWebsiteRulesStore();
const i18n = useI18nStore();
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const editingWebsiteList = ref<IWebsiteRuleList>(websiteRulesStore.getDummyWebsiteRuleList);
const isNewItem = ref(false);
const isEmpty = ref(false);
const confirmDeleteListItems = ref(false);

i18n.fetchLocaleSettingsAndMessages();
websiteRulesStore.fetchData();
utils.runtimeMessages.createBatchMessageListenerM2O(['websiteRulesUpdated', 'websiteRuleListsUpdated'], () => {
  websiteRulesStore.fetchData();
});
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

const closeEditDialog = () => {
  dialogEdit.value = false;
  editingWebsiteList.value = websiteRulesStore.getDummyWebsiteRuleList;
  isNewItem.value = true;
};

const saveItem = (item: IWebsiteRuleList) => {
  if (isNewItem.value) {
    websiteRulesStore.addWebsiteRuleList(item);
  } else {
    websiteRulesStore.updateWebsiteRuleList(item);
  }
  closeEditDialog();
};

const newItem = () => {
  editingWebsiteList.value = websiteRulesStore.getDummyWebsiteRuleList;
  isNewItem.value = true;
  dialogEdit.value = true;
};
const editItem = (id: string) => {
  let list = websiteRulesStore.getWebsiteRuleListById(id);
  if (list) {
    editingWebsiteList.value = list;
    isNewItem.value = false;
    dialogEdit.value = true;
  } else {
    //TODO show error message
  }
};

const openDeleteDialog = (id: string) => {
  let list = websiteRulesStore.getWebsiteRuleListById(id);
  if (list) {
    editingWebsiteList.value = list;
    isEmpty.value = websiteRulesStore.getWebsiteRulesByListId(id).length === 0;
    confirmDeleteListItems.value = false;
    dialogDelete.value = true;
  } else {
    //TODO show error message
  }
};

const deleteItemConfirm = () => {
  websiteRulesStore.deleteWebsiteRuleList(editingWebsiteList.value.id);
  closeDelete();
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    isEmpty.value = false;
    confirmDeleteListItems.value = false;
    editingWebsiteList.value = websiteRulesStore.getDummyWebsiteRuleList;
  });
};
const t = (key: string) => computed(() => i18n.getTranslation(key)).value;

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <div v-if="!websiteRulesStore.isLoading">
      <v-list class="bg-background border-radius-8">
        <router-link v-for="list in websiteRulesStore.getWebsiteRuleLists" :key="list.id"
                     :to="{ name: 'WebsitesByListId', params: { id: list.id } }" class="router-link">
          <sidebar-list-item :list-id="list.id" :list-name="list.name"
                             :delete-item="() => openDeleteDialog(list.id)"
                             :edit-item="() => editItem(list.id)"
                             :move-up="websiteRulesStore.moveUpWebsiteRuleList"
                             :move-down="websiteRulesStore.moveDownWebsiteRuleList"
                             :t="t"
          ></sidebar-list-item>
        </router-link>
        <v-divider></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <div>
              <v-btn density="compact" icon="mdi-plus" @click="newItem" color="accent" variant="elevated"
                     elevation="4" :disabled="websiteRulesStore.getWebsiteRuleLists.length > 9"></v-btn>
              <v-tooltip activator="parent" location="bottom"
                         :disabled="websiteRulesStore.getWebsiteRuleLists.length < 10">
                {{ t(msg.MAXIMUM_WEBSITE_RULE_LISTS_REACHED) }}
              </v-tooltip>
            </div>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }" class="router-link">
          <v-list-item :title="t(msg.ALL_WEBSITE_RULE_LISTS)" value="all"></v-list-item>
        </router-link>
      </v-list>
    </div>
  </v-sheet>
  <edit-website-rule-list-dialog :p-dialog="dialogEdit" :p-item="editingWebsiteList" :p-save-item="saveItem"
                                 :p-is-new-item="isNewItem" :p-close-dialog="closeEditDialog"
                                 :t="t"></edit-website-rule-list-dialog>

  <fg-modal
    :dialog="dialogDelete"
    :max-width="'900px'"
  >
    <template v-slot:title>
      <span>{{ t(msg.DELETE_WEBSITE_RULE_LIST) }}</span>
    </template>
    <div class="d-flex flex-column text-body-1">
      {{ t(msg.ARE_YOU_SURE_DELETE_THIS_WEBSITE_RULE_LIST) }}
      <div><v-icon>mdi-chevron-double-right</v-icon>{{ editingWebsiteList.name }}<v-icon>mdi-chevron-double-left</v-icon></div>
    </div>
    <v-divider v-if="!isEmpty" class="mx-1 my-2"></v-divider>
    <div class="d-flex flex-column text-body-2" v-if="!isEmpty">
      <span>{{ t(msg.THE_WEBSITE_RULE_LIST_IS_NOT_EMPTY) }}</span>
      <v-checkbox
        color="danger" v-if="!isEmpty" v-model="confirmDeleteListItems"
        :label="t(msg.ALSO_DELETE_ALL_ASSOCIATED_WEBSITE_RULES)">
      </v-checkbox>
    </div>
    <template v-slot:actions>
      <v-btn @click="closeDelete" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
      <v-btn @click="deleteItemConfirm" color="danger" variant="elevated" elevation="8" :disabled="!isEmpty && !confirmDeleteListItems">
        {{ t(msg.DELETE) }}
      </v-btn>
    </template>
  </fg-modal>
</template>

<style scoped lang="scss">

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
