<script setup lang="ts">
import { IWebsiteRuleList } from '@/interfaces';
import { computed, ref, watch } from 'vue';
import { msg } from '@/constants';

const props = defineProps({
  pDialog: {
    type: Boolean,
    required: true
  },
  pItem: {
    type: Object as () => IWebsiteRuleList,
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
  },
  t: {
    type: Function,
    required: true
  }
});

let dialog = ref(false);
let valid = ref(true);
let name = ref('');

const nameRules = computed(() => {
  return [
    (v: string) => !!v || props.t(msg.NAME_IS_REQUIRED),
    (v: string) => (v && v.length <= 50) || props.t(msg.NAME_MUST_BE_LESS_THAN_50_CHARACTERS)
  ];
});

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    name.value = props.pItem.name;
  }
});

const save = () => {
  let editedItem = {
    ...props.pItem,
    name: name.value
  };
  props.pSaveItem(editedItem);
};

const close = () => {
  props.pCloseDialog();
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-form @keydown.enter.prevent>
      <v-card color="background">
        <v-card-item>
          <v-card-title>
            <span class="headline">{{ pIsNewItem ? t(msg.NEW_WEBSITE_RULE_LIST) : t(msg.EDIT_WEBSITE_RULE_LIST) }}</span>
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" :rules="nameRules" :label="t(msg.NAME_OF_WEBSITE_RULE_LIST)" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="danger" variant="elevated">{{ t(msg.CANCEL) }}</v-btn>
          <v-btn @click="save" :disabled="!valid" color="success" variant="elevated">{{ t(msg.SAVE) }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
