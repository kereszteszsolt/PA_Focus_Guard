<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';
import { IWebsiteList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';

export default {
  name: 'SidebarLists',
  components: { SidebarListItem },
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
    return {
      websiteStore,
      dialog,
      dialogDelete,
      editingWebsiteList: editingWebsiteList,
      isNewItem
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
    save() {
      if (this.isNewItem) {
        this.websiteStore.addWebsiteList(this.editingWebsiteList);
      } else {
        this.websiteStore.updateWebsiteList(this.editingWebsiteList.id, this.editingWebsiteList);
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
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Website List</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="editingWebsiteList.name"
                label="Name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5"
      >Are you sure you want to delete this item?
      </v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
        >Cancel
        </v-btn
        >
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="deleteItemConfirm"
        >OK
        </v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
