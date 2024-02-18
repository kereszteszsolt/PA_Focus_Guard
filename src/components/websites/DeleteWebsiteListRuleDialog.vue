<script lang="ts">
import { defineComponent } from 'vue';
import { IWebsiteList } from '@/interfaces';

export default defineComponent({
  name: 'DeleteWebsiteListRuleDialog',
  props: {
    pDialog: {
      type: Boolean,
      required: true
    },
    pItem: {
      type: Object as () => IWebsiteList,
      required: true
    },
    pCloseDialog: {
      type: Function,
      required: true
    },
    pDeleteItemConfirm: {
      type: Function,
      required: true
    },
    pIsEmpty: {
      type: Boolean,
      required: true
    }
  },
  data: () => {
    return {
      item: {} as IWebsiteList,
      isEmpty: false,
      dialog: false,
      confirmDeleteListItems: false
    };
  },
  watch: {
    pDialog(val: boolean) {
      this.dialog = val;
      if (val) {
        this.isEmpty = this.pIsEmpty;
        this.item = this.pItem;
      }
    }
  },
  computed: {
    eligibleForDeletion(): boolean {
      return !this.isEmpty ? this.confirmDeleteListItems : true;
    }
  }
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-item>
        <v-card-title class="headline">Delete Website Rule</v-card-title>
      </v-card-item>
      <v-card-text class="text-body-1 mb-4">
        Are you sure you want to delete this website rule?
      </v-card-text>
      <v-divider v-if="!isEmpty"></v-divider>
      <v-checkbox
        color="danger" v-if="!isEmpty" v-model="confirmDeleteListItems" label="Also delete all items in this list"></v-checkbox>
      <v-divider v-if="!isEmpty"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog" color="primary">Cancel</v-btn>
        <v-btn @click="pDeleteItemConfirm" color="danger" :disabled="!eligibleForDeletion">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
