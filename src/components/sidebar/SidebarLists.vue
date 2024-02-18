<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';
import { IWebsiteList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import EditWebsiteRulesListDialog from '@/components/websites/EditWebsiteRulesListDialog.vue';
import DeleteWebsiteListRuleDialog from '@/components/websites/DeleteWebsiteListRuleDialog.vue';

export default {
  name: 'SidebarLists',
  components: { DeleteWebsiteListRuleDialog, EditWebsiteRulesListDialog, SidebarListItem },
  data: () => {
    const websiteStore = useWebsiteStore();
    let dialog = false;
    let dialogDelete = false;
    let editingWebsiteList: IWebsiteList = {
      id: '',
      name: '',
      order: 0
    };
    let isNewItem = true;
    let isEmpty = false;
    return {
      websiteStore,
      dialog,
      dialogDelete,
      editingWebsiteList: editingWebsiteList,
      isNewItem,
      isEmpty
    };
  },
  mounted() {
    this.websiteStore.fetchData();
  },
  computed: {
    pathId() {
      return this.$route.params.id;
    }
  },
  methods: {
    close() {
      this.dialog = false;
    },
    save(editedItem: IWebsiteList) {
      if (this.isNewItem) {
        this.websiteStore.addWebsiteList(editedItem);
      } else {
        this.websiteStore.updateWebsiteList(this.editingWebsiteList.id, editedItem);
      }
      this.editingWebsiteList = {
        id: '',
        name: '',
        order: 0
      };
      this.close();
    },
    editItem(id: string) {
      const found = this.websiteStore.getWebsiteListById(id);
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
      const found = this.websiteStore.getWebsiteListById(id);
      if (found) {
        this.editingWebsiteList = found;
        const foundItems = this.websiteStore.getWebsiteByListId(id);
        this.isEmpty = foundItems.length === 0;
        this.dialogDelete = true;
      } else {
        console.error('Website List not found');
        //todo show error message
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItemConfirm() {
      this.websiteStore.deleteWebsiteList(this.editingWebsiteList.id);
      this.editingWebsiteList = {
        id: '',
        name: '',
        order: 0
      };
      this.closeDelete();
    }
  }
};
</script>

<template>
  <v-sheet class="sidebar-lists" color="background">
    <div v-if="!websiteStore.isLoading">
      <v-list>
        <router-link v-for="list in websiteStore.getWebsiteLists" :key="list.id"
                     :to="{ name: 'WebsitesByListId', params: { id: list.id } }" class="router-link">
          <sidebar-list-item :list-id="list.id" :list-name="list.name"
                             :delete-item="() => deleteItem(list.id)"
                             :edit-item="() => editItem(list.id)"
                             :move-up="websiteStore.moveUpWebsiteList"
                             :move-down="websiteStore.moveDownWebsiteList"
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
