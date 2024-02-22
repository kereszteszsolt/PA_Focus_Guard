<script setup lang="ts">
import { useWebsiteRulesStore } from '@/store';
import { IWebsiteRuleList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import EditWebsiteRulesListDialog from '@/components/websites/EditWebsiteRulesListDialog.vue';
import DeleteWebsiteListRuleDialog from '@/components/websites/DeleteWebsiteListRuleDialog.vue';
import { ref } from 'vue';

const websiteRulesStore = useWebsiteRulesStore();
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const editingWebsiteList = ref<IWebsiteRuleList>(websiteRulesStore.getDummyWebsiteRuleList);
const isNewItem = ref(false);
const isEmpty = ref(false);

websiteRulesStore.fetchData();

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

const deleteItem = (id: string) => {
  let list = websiteRulesStore.getWebsiteRuleListById(id);
  if (list) {
    editingWebsiteList.value = list;
    isEmpty.value = websiteRulesStore.getWebsiteRulesByListId(id).length === 0;
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
  editingWebsiteList.value = websiteRulesStore.getDummyWebsiteRuleList;
};

</script>

<template>
  <v-sheet class="sidebar-lists" color="background">
    <div v-if="!websiteRulesStore.isLoading">
      <v-list>
        <router-link v-for="list in websiteRulesStore.getWebsiteRuleLists" :key="list.id"
                     :to="{ name: 'WebsitesByListId', params: { id: list.id } }" class="router-link">
          <sidebar-list-item :list-id="list.id" :list-name="list.name"
                             :delete-item="() => deleteItem(list.id)"
                             :edit-item="() => editItem(list.id)"
                             :move-up="websiteRulesStore.moveUpWebsiteRuleList"
                             :move-down="websiteRulesStore.moveDownWebsiteRuleList"
          ></sidebar-list-item>
        </router-link>
        <v-divider></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <v-btn density="compact" icon="mdi-plus" @click="newItem"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }" class="router-link">
          <v-list-item title="All Websites" value="all"></v-list-item>
        </router-link>
      </v-list>
    </div>
  </v-sheet>
  <edit-website-rules-list-dialog :p-dialog="dialogEdit" :p-item="editingWebsiteList" :p-save-item="saveItem"
                                  :p-is-new-item="isNewItem" :p-close-dialog="closeEditDialog"></edit-website-rules-list-dialog>
  <delete-website-list-rule-dialog :p-dialog="dialogDelete" :p-item="editingWebsiteList"
                                   :p-delete-item-confirm="deleteItemConfirm" :p-close-dialog="closeDelete"
                                   :p-is-empty="isEmpty"></delete-website-list-rule-dialog>
</template>

<style scoped lang="scss">
.sidebar-lists {
  height: 100%;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
