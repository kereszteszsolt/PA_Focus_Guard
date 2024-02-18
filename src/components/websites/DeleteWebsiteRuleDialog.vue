<script lang="ts">
import { defineComponent } from 'vue';
import { IWebsite } from '@/interfaces';

export default defineComponent({
  name: 'DeleteWebsiteRuleDialog',
  props: {
    pDialog: {
      type: Boolean,
      required: true
    },
    pItem: {
      type: Object as () => IWebsite,
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
      item: {} as IWebsite,
      isEmpty: false,
      dialog: false
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
  }
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <v-card>
      <v-card-title class="headline">Delete Website Rule</v-card-title>
      <v-card-text>
        Are you sure you want to delete this website rule?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="pCloseDialog">Cancel</v-btn>
        <v-btn @click="pDeleteItemConfirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
