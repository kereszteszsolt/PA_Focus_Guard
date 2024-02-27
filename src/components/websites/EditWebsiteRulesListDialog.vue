<script setup lang="ts">
import { IWebsiteRuleList } from '@/interfaces';
import { computed, ref, watch } from 'vue';

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
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 50) || 'Name must be less than 50 characters'
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
          <v-btn @click="close" color="danger" variant="elevated">{{ t('cancel') }}</v-btn>
          <v-btn @click="save" :disabled="!valid" color="success" variant="elevated">{{ t('save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
