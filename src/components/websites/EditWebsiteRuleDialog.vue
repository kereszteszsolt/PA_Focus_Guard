<script lang="ts">
import { IWebsite } from '@/interfaces';

export default {
  name: 'EditWebsiteRuleDialog',
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
    pSaveItem: {
      type: Function,
      required: true
    }
  },
  data: () => {
    return {
      dialog: false,
      valid: true,
      url: '',
      permanentlyActive: false,
      temporarilyInactive: false
    };
  },
  computed: {
    urlRules() {
      return [
        (v: string) => !!v || 'URL is required',
        (v: string) => this.validateUrl(v) || 'URL must be valid'
      ];
    }
  },
  mounted() {

  },
  watch: {
    pDialog(val: boolean) {
      this.dialog = val;
      if (val) {
        this.url = this.pItem.url;
        this.permanentlyActive = this.pItem.permanentlyActive;
        this.temporarilyInactive = this.pItem.temporarilyInactive;
      }
    }
  },
  methods: {
    validateUrl(url: string): boolean {
      const regexPattern = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      return regexPattern.test(url);
    },
    permanentlyActiveChanged() {
      this.temporarilyInactive = this.permanentlyActive ? false : this.temporarilyInactive;
    },
    temporarilyInactiveChanged() {
      this.permanentlyActive = this.temporarilyInactive ? false : this.permanentlyActive;
    },
    close() {
      this.pCloseDialog();
    },
    save() {
      let editedItem: IWebsite = {
        ...this.pItem,
        url: this.url,
        permanentlyActive: this.permanentlyActive,
        temporarilyInactive: this.temporarilyInactive
      };
      console.log('editedItem', editedItem);
      this.pSaveItem(editedItem);
    }
  }
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-form v-model="valid" @keydown.enter.prevent>
      <v-card>
        <v-card-item>
          <v-card-title>
            <span class="headline">New Item</span>
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="URL"
                  v-model="url"
                  :rules="urlRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox
                  label="Permanently Active"
                  v-model="permanentlyActive"
                  @change="permanentlyActiveChanged"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox
                  label="Temporarily Inactive"
                  v-model="temporarilyInactive"
                  @change="temporarilyInactiveChanged"
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="close">Cancel</v-btn>
          <v-btn @click="save" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
