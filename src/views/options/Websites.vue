<script lang="ts">
import { useWebsiteRulesStore } from '@/store/websiteRulesStore';
import { IWebsiteRule } from '@/interfaces';
import EditWebsiteRuleDialog from '@/components/websites/EditWebsiteRuleDialog.vue';
import DeleteWebsiteRuleDialog from '@/components/websites/DeleteWebsiteRuleDialog.vue';

export default {
  name: 'Websites',
  components: { DeleteWebsiteRuleDialog, EditWebsiteRuleDialog },
  data: () => {
    const websiteRulesStore = useWebsiteRulesStore();
    let dialog: boolean = false;
    let dialogDelete = false;
    let editingId = '';
    let editingItem: IWebsiteRule = websiteRulesStore.getDummyWebsiteRule;
    let isNewItem = false;
    let isValid = true;

    return {
      dialog,
      dialogDelete,
      editingId,
      editingItem,
      websiteRulesStore: websiteRulesStore,
      isNewItem,
      isValid,
      headers: [
        { title: 'URL', value: 'url' },
        { title: 'Permanently Active', value: 'permanentlyActive' },
        { title: 'Temporarily Inactive', value: 'temporarilyInactive' },
        { title: 'Actions', value: 'actions' },
        { title: 'Order', value: 'order' },
        { title: 'Global Order', value: 'globalOrder' }
      ]
    };
  },
  mounted() {
    this.websiteRulesStore.fetchData();
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
    moveUp(): Function {
      return this.pathId === 'all' ? this.websiteRulesStore.moveUpWebsiteRulesGlobalOrder : this.websiteRulesStore.moveUpWebsiteRule;
    },
    moveDown(): Function {
      return this.pathId === 'all' ? this.websiteRulesStore.moveDownWebsiteRulesGlobalOrder : this.websiteRulesStore.moveDownWebsiteRule;
    },
    sortByFieldName(): { key: string, order?: boolean |  'asc' | 'desc' }[] {
      return this.pathId === 'all' ? [{ key: 'globalOrder', order: 'asc' }] : [{ key: 'order', order: 'asc' }];
    },
    websiteRuleList() {
      return this.websiteRulesStore.getWebsiteRuleListById(this.pathId);
    },
    websiteRuleListName() {
      return (this.pathId === 'all' || !this.pathId) ?
        'All Websites' : this.websiteRuleList?.name;
    },
    websiteRules(): IWebsiteRule[] {
      return (this.pathId === 'all' || !this.pathId) ?
        this.websiteRulesStore.getAllWebsiteRules :
        this.websiteRulesStore.getWebsiteRulesByListId(this.pathId);
    },
  },
  methods: {
    setPermanentlyActive(item: IWebsiteRule) {
      item.temporarilyInactive = item.permanentlyActive ? false : item.temporarilyInactive;
      this.websiteRulesStore.saveWebsiteRules();
    },
    setTemporarilyInactive(item: IWebsiteRule) {
      item.permanentlyActive = item.temporarilyInactive ? false : item.permanentlyActive;
      this.websiteRulesStore.saveWebsiteRules();
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
      const found = this.websiteRulesStore.getWebsiteRuleById(id);
      if (found) {
        this.editingItem = found;
        this.dialog = true;
      } else {
        console.error('Website not found');
        // throw new Error('Website not found');  TODO - handle error
      }
    },
    deleteItem(item: IWebsiteRule) {
      const found = this.websiteRulesStore.getWebsiteRuleById(item.id);
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
      this.websiteRulesStore.deleteWebsiteRule(this.editingId);
      this.closeDelete();
    },
    closeEdit() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editingId = '';
        this.editingItem = this.editingItem = this.websiteRulesStore.getDummyWebsiteRule;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editingId = '';
        this.editingItem = this.websiteRulesStore.getDummyWebsiteRule;
      });
    },
    save(editedItem: IWebsiteRule) {
      if (this.isNewItem) {
        this.websiteRulesStore.addWebsiteRule(editedItem);
        this.isNewItem = false;
      } else {
        this.websiteRulesStore.updateWebsiteRule(this.editingItem.id, editedItem);
      }
      this.closeEdit();
      console.log('save', editedItem);
    },
  },
  watch: {
    dialog(val) {
      val || this.closeEdit();
    }
  },
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
