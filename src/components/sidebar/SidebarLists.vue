<script lang="ts">
import { useWebsiteRulesStore } from '@/store/websiteRulesStore';
import { IWebsiteRuleList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import EditWebsiteRulesListDialog from '@/components/websites/EditWebsiteRulesListDialog.vue';
import DeleteWebsiteListRuleDialog from '@/components/websites/DeleteWebsiteListRuleDialog.vue';

export default {
  name: 'SidebarLists',
  components: { DeleteWebsiteListRuleDialog, EditWebsiteRulesListDialog, SidebarListItem },
  data: () => {
    const websiteRulesStore = useWebsiteRulesStore();
    let dialog = false;
    let dialogDelete = false;
    let editingWebsiteList: IWebsiteRuleList = websiteRulesStore.getDummyWebsiteRuleList;
    let isNewItem = true;
    let isEmpty = false;
    return {
      websiteRulesStore: websiteRulesStore,
      dialog,
      dialogDelete,
      editingWebsiteList: editingWebsiteList,
      isNewItem,
      isEmpty
    };
  },
  mounted() {
    this.websiteRulesStore.fetchData();
  },
  computed: {
    pathId() {
      return this.$route.params.id;
    }
  },
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editingWebsiteList = this.websiteRulesStore.getDummyWebsiteRuleList;
        this.isNewItem = true;
      });
    },
    save(editedItem: IWebsiteRuleList) {
      if (this.isNewItem) {
        this.websiteRulesStore.addWebsiteRuleList(editedItem);
      } else {
        this.websiteRulesStore.updateWebsiteRuleList(this.editingWebsiteList.id, editedItem);
        this.isNewItem = true;
      }
      this.close();
    },
    editItem(id: string) {
      const found = this.websiteRulesStore.getWebsiteRuleListById(id);
      if (found) {
        this.editingWebsiteList = found;
        this.dialog = true;
        this.isNewItem = false;
      } else {
        console.error('Website List not found');
        //todo show error message
      }
    },
    deleteItem(id: string) {
      const found = this.websiteRulesStore.getWebsiteRuleListById(id);
      if (found) {
        this.editingWebsiteList = found;
        const foundItems = this.websiteRulesStore.getWebsiteRulesByListId(id);
        this.isEmpty = foundItems.length === 0;
        this.dialogDelete = true;
      } else {
        console.error('Website List not found');
        //todo show error message
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editingWebsiteList = this.websiteRulesStore.getDummyWebsiteRuleList;
      });
    },
    deleteItemConfirm() {
      this.websiteRulesStore.deleteWebsiteRuleList(this.editingWebsiteList.id);
      this.closeDelete();
    }
  }
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
            <v-btn density="compact" icon="mdi-plus" @click="dialog = true"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }" class="router-link">
          <v-list-item title="All Websites" value="all"></v-list-item>
        </router-link>
      </v-list>
    </div>
  </v-sheet>
  <edit-website-rules-list-dialog :p-dialog="dialog" :p-item="editingWebsiteList" :p-save-item="save"
                                  :p-is-new-item="isNewItem" :p-close-dialog="close"></edit-website-rules-list-dialog>

  <delete-website-list-rule-dialog :p-dialog="dialogDelete" :p-item="editingWebsiteList"
                                   :p-delete-item-confirm="deleteItemConfirm" :p-close-dialog="closeDelete"
                                   :p-is-empty="isEmpty"></delete-website-list-rule-dialog>
</template>

<style scoped lang="scss">
.sidebar-lists {
  height: 100%;
}

.v-list-item-title {
  font-size: 1.2rem;
  font-weight: 1200;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
