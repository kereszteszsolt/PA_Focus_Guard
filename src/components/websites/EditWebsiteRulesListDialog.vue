<script lang="ts">
import { defineComponent } from 'vue';
import { IWebsiteList } from '@/interfaces';

export default defineComponent({
  name: 'EditWebsiteRulesListDialog',
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
    pSaveItem: {
      type: Function,
      required: true
    },
    pIsNewItem: {
      type: Boolean,
      required: true
    }
  },
  data: () => {
    return {
      dialog: false,
      valid: true,
      name: '',
      nameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ]
    };
  },
  watch: {
    pDialog(val: boolean) {
      this.dialog = val;
      if (val) {
        this.name = this.pItem.name;
      }
    }
  },
  methods: {
    save() {
      let editedItem = {
        ...this.pItem,
        name: this.name
      };
      this.pSaveItem(editedItem);
    },
    close() {
      this.pCloseDialog();
    }
  }
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-form @keydown.enter.prevent>
      <v-card>
        <v-card-item>
          <v-card-title>
            <span class="headline">{{ pIsNewItem ? 'Add Website List' : 'Edit Website List' }}</span>
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="danger">Cancel</v-btn>
          <v-btn @click="save" :disabled="!valid" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
