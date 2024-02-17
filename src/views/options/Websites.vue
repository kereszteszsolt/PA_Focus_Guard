<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';
import { IWebsite, WebsiteType } from '@/interfaces';
import EditWebsiteRuleDialog from '@/components/websites/EditWebsiteRuleDialog.vue';

export default {
  name: 'Websites',
  components: { EditWebsiteRuleDialog },
  data: () => {
    const websiteStore = useWebsiteStore();
    let dialog: boolean = false;
    let dialogDelete = false;
    let editingId = '';
    let editingItem: IWebsite = {
      id: '',
      listId: '',
      url: '',
      permanentlyActive: false,
      temporarilyInactive: false,
      order: -1,
      globalOrder: -1
    };
    let isNewItem = false;
    let isValid = true;

    return {
      dialog,
      dialogDelete,
      editingId,
      editingItem,
      websiteStore,
      isNewItem,
      isValid,
      headers: [
        { title: 'URL', value: 'url' },
        { title: 'Permanently Active', value: 'permanentlyActive' },
        { title: 'Temporarily Inactive', value: 'temporarilyInactive' },
        { title: 'Actions', value: 'actions' }
      ]
    };
  },
  mounted() {
    this.websiteStore.fetchData();
  },
  computed: {
    formTitle() {
      return this.editingId === '' ? 'New Item' : 'Edit Item';
    },
    pathId() {
      return this.$route.params.id as string;
    },
    showAll(): boolean {
      return this.pathId === 'all' || !this.pathId;
    },
    websiteList() {
      return this.websiteStore.getWebsiteListById(this.pathId);
    },
    websiteListName() {
      return (this.pathId === 'all' || !this.pathId) ?
        'All Websites' : this.websiteList?.name;
    },
    websites(): WebsiteType[] {
      return (this.pathId === 'all' || !this.pathId) ?
        this.websiteStore.getAllWebsites :
        this.websiteStore.getWebsiteByListId(this.pathId);
    }
  },
  methods: {
    setPermanentlyActive(item: IWebsite) {
      item.temporarilyInactive = item.permanentlyActive ? false : item.temporarilyInactive;
      this.websiteStore.saveWebsites();
    },
    setTemporarilyInactive(item: IWebsite) {
      item.permanentlyActive = item.temporarilyInactive ? false : item.permanentlyActive;
      this.websiteStore.saveWebsites();
    },
    newItem() {
      this.editingItem = {
        ...this.editingItem,
        listId: this.pathId
      };
      this.isNewItem = true;
      this.dialog = true;
    },
    editItem(id: string) {
      const found = this.websiteStore.getWebsiteById(id);
      if (found) {
        this.editingItem = found;
        this.dialog = true;
      } else {
        console.error('Website not found');
        // throw new Error('Website not found');  TODO - handle error
      }
    },
    deleteItem(item: IWebsite) {
      const found = this.websiteStore.getWebsiteById(item.id);
      if (found) {
        this.editingId = found.id;
        this.editingItem = found;
        this.dialogDelete = true;
      } else {
        console.error('Website not found');
        // throw new Error('Website not found');  TODO - handle error
      }
    },
    deleteItemConfirm() {
      this.websiteStore.deleteWebsite(this.editingId);
      this.closeDelete();
    },
    closeEdit() {
      this.dialog = false;
      // this.$nextTick(() => {
      //   this.editingId = '';
      // });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editingId = '';
      });
    },
    save(editedItem: IWebsite) {
      if (this.isNewItem) {
        this.websiteStore.addWebsite(editedItem);
        this.isNewItem = false;
      } else {
        this.websiteStore.updateWebsite(this.editingItem.id, editedItem);
      }
      this.closeEdit();
      console.log('save', editedItem);
    },
  },
  watch: {
    dialog(val) {
      val || this.closeEdit();
    }
  }
};
</script>

<template>
  <div v-if="!websiteStore.isLoading">
    <v-data-table
      :headers="headers"
      :items="websites"
      class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        <v-icon small @click="editItem(item.id)">mdi-pencil</v-icon>
        <v-icon small @click="websiteStore.moveUpWebsite(item.id)">mdi-arrow-up</v-icon>
        <v-icon small @click="websiteStore.moveDownWebsite(item.id)">mdi-arrow-down</v-icon>
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
          <v-toolbar-title>Website List: {{ websiteListName }}</v-toolbar-title>

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
