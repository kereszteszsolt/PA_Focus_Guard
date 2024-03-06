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

const dialog = ref(false);
const valid = ref(true);
const name = ref('');
const fieldTouched = ref(false);
const errorMessage = ref('');
const length = ref(0);

const validateField = () => {
  errorMessage.value = '';
  const rules = nameRules.value;
    for (const rule of rules) {
      const validationResult = rule(name.value);
      if (validationResult !== true) {
        errorMessage.value = validationResult;
        valid.value = false;
        return;
      } else {
        valid.value = true;
      }
    }
};

const nameRules = computed(() => {
  return [
    (v: string) => !!v || props.t(msg.NAME_IS_REQUIRED),
    (v: string) => (v && v.length < 26) || props.t(msg.NAME_MUST_BE_LESS_THAN_26_CHARACTERS)
  ];
});

const touched = () => {
  fieldTouched.value = true;
  validateField();
};

watch( [name], () => {
  if (fieldTouched.value) {
    validateField();
  }
  length.value = name.value.length;
}, { immediate: true });

watch(() => props.pDialog, (value) => {
  dialog.value = value;
  if (value) {
    name.value = props.pItem.name;
    length.value = name.value.length;
    errorMessage.value = '';
    valid.value = true;
    fieldTouched.value = false;
  }
});

const save = () => {
  validateField();
  if (valid.value) {
    let editedItem = {
      ...props.pItem,
      name: name.value
    };
    props.pSaveItem(editedItem);
  }
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
            <span class="headline">{{
                pIsNewItem ? t(msg.NEW_WEBSITE_RULE_LIST) : t(msg.EDIT_WEBSITE_RULE_LIST)
              }}</span>
          </v-card-title>
        </v-card-item>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" :error-messages="errorMessage" :label="t(msg.NAME_OF_WEBSITE_RULE_LIST)"
                              @blur="touched" required :suffix="length + '/25'">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="danger" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
          <v-btn @click="save" :disabled="!valid" color="success" variant="elevated" elevation="8">{{
              t(msg.SAVE)
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
