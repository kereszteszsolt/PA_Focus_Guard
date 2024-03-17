<script setup lang="ts">
import { useI18nStore, useWebsiteRulesStore } from '@/store';
import { IWebsiteRuleList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import { computed, nextTick, ref, watch } from 'vue';
import { msg } from '@/constants';
import * as utils from '@/utils';
import { FgDialog, FgFormDialog } from '@/components/common';

const websiteRulesStore = useWebsiteRulesStore();
const i18n = useI18nStore();
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const editingRuleWebsiteList = ref<IWebsiteRuleList>(websiteRulesStore.getDummyWebsiteRuleList);
const isNewItem = ref(false);
const isEmpty = ref(false);
const confirmDeleteListItems = ref(false);
const isValid = ref(false);
const errorMessage = ref('');
const fieldTouched = ref(false);
const name = ref('');
const length = ref(0);

i18n.fetchLocaleSettingsAndMessages();
websiteRulesStore.fetchData();
utils.runtimeMessages.createBatchMessageListenerM2O(['websiteRulesUpdated', 'websiteRuleListsUpdated'], () => {
  websiteRulesStore.fetchData();
});
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

const touched = () => {
  fieldTouched.value = true;
  validateField();
};


const validateField = () => {
  name.value = name.value.trim();
  errorMessage.value = '';
  const rules = nameRules.value;
  for (const rule of rules) {
    const validationResult = rule(name.value);
    if (validationResult !== true) {
      errorMessage.value = validationResult;
      isValid.value = false;
      return;
    } else {
      isValid.value = true;
    }
  }
};

watch([name], () => {
  if (fieldTouched.value) {
    validateField();
  }
  length.value = name.value.length;
}, { immediate: true });

const nameRules = computed(() => {
  return [
    (v: string) => !!v || t(msg.NAME_IS_REQUIRED),
    (v: string) => (v && v.length < 26) || t(msg.NAME_MUST_BE_LESS_THAN_26_CHARACTERS)
  ];
});
const closeEditDialog = () => {
  dialogEdit.value = false;
  nextTick(() => {
    editingRuleWebsiteList.value = { ...websiteRulesStore.getDummyWebsiteRuleList };
    isNewItem.value = true;
    isValid.value = true;
    errorMessage.value = '';
    fieldTouched.value = false;
    name.value = '';
  });
};

const saveItem = () => {
  validateField();
  if (!isValid.value) {
    return;
  }
  editingRuleWebsiteList.value.name = name.value;
  if (isNewItem.value) {
    websiteRulesStore.addWebsiteRuleList(editingRuleWebsiteList.value);
  } else {
    websiteRulesStore.updateWebsiteRuleList(editingRuleWebsiteList.value);
  }
  closeEditDialog();
};

const openEditDialog = (_id: string | null) => {
  let list = _id && websiteRulesStore.getWebsiteRuleListById(_id);
  if (_id && !list) {
    //TODO show error message
    return;
  }
  editingRuleWebsiteList.value = list ? { ...list } : { ...websiteRulesStore.getDummyWebsiteRuleList };
  isNewItem.value = !_id;
  isValid.value = true;
  errorMessage.value = '';
  fieldTouched.value = false;
  name.value = editingRuleWebsiteList.value.name;
  dialogEdit.value = true;
};

const openDeleteDialog = (id: string) => {
  let list = websiteRulesStore.getWebsiteRuleListById(id);
  if (list) {
    editingRuleWebsiteList.value = { ...list };
    isEmpty.value = websiteRulesStore.getWebsiteRulesByListId(id).length === 0;
    confirmDeleteListItems.value = false;
    dialogDelete.value = true;
  } else {
    //TODO show error message
  }
};

const deleteItemConfirm = () => {
  websiteRulesStore.deleteWebsiteRuleList(editingRuleWebsiteList.value.id);
  closeDelete();
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    isEmpty.value = false;
    confirmDeleteListItems.value = false;
    editingRuleWebsiteList.value = websiteRulesStore.getDummyWebsiteRuleList;
  });
};
const t = (key: string) => computed(() => i18n.getTranslation(key)).value;

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <div v-if="!websiteRulesStore.isLoading">
      <v-list class="bg-background border-radius-8">
        <router-link v-for="list in websiteRulesStore.getWebsiteRuleLists" :key="list.id"
                     :to="{ name: 'WebsitesByListId', params: { id: list.id } }" class="router-link">
          <sidebar-list-item :list-id="list.id" :list-name="list.name"
                             :delete-item="() => openDeleteDialog(list.id)"
                             :edit-item="() => openEditDialog(list.id)"
                             :move-up="websiteRulesStore.moveUpWebsiteRuleList"
                             :move-down="websiteRulesStore.moveDownWebsiteRuleList"
                             :t="t"
          ></sidebar-list-item>
        </router-link>
        <v-divider></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <div>
              <v-btn density="compact" icon="mdi-plus" @click="openEditDialog(null)" color="accent" variant="elevated"
                     elevation="4" :disabled="websiteRulesStore.getWebsiteRuleLists.length > 9"></v-btn>
              <v-tooltip activator="parent" location="bottom"
                         :disabled="websiteRulesStore.getWebsiteRuleLists.length < 10">
                {{ t(msg.MAXIMUM_WEBSITE_RULE_LISTS_REACHED) }}
              </v-tooltip>
            </div>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }" class="router-link">
          <v-list-item :title="t(msg.ALL_WEBSITE_RULE_LISTS)" value="all"></v-list-item>
        </router-link>
      </v-list>
    </div>
  </v-sheet>

  <fg-form-dialog
    v-model:dialog="dialogEdit"
    v-model:valid="isValid"
    :max-width="'900px'"
    :title="isNewItem ? t(msg.NEW_WEBSITE_RULE_LIST) : t(msg.EDIT_WEBSITE_RULE_LIST)"
    :actions="[
      { key: msg.CANCEL, name: t(msg.CANCEL), clickHandler: closeEditDialog, color: 'success' },
      { key: msg.SAVE, name: t(msg.SAVE), clickHandler: saveItem, color: 'danger', disabled: !isValid }
    ]"
  >
    <v-text-field v-model="name" :error-messages="errorMessage"
                  :label="t(msg.NAME_OF_WEBSITE_RULE_LIST)"
                  @blur="touched" @change="touched" required :suffix="name.length + '/25'">
    </v-text-field>
  </fg-form-dialog>

  <fg-dialog
    v-model:dialog="dialogDelete"
    :max-width="'900px'"
    :title="t(msg.DELETE_WEBSITE_RULE_LIST)"
    :main-text="t(msg.ARE_YOU_SURE_DELETE_THIS_WEBSITE_RULE_LIST)"
    :main-text-item="editingRuleWebsiteList.name"
    :secondary-text="isEmpty ? '' : t(msg.THE_WEBSITE_RULE_LIST_IS_NOT_EMPTY)"
    :actions="[
      { key: msg.DELETE, name: t(msg.DELETE), clickHandler: deleteItemConfirm, color: 'danger', disabled: !isEmpty && !confirmDeleteListItems},
      { key: msg.CANCEL, name: t(msg.CANCEL), clickHandler: closeDelete, color: 'success'}
    ]"
  >
    <template v-slot:secondary_text_item v-if="!isEmpty">
      <v-checkbox
        color="danger" v-model="confirmDeleteListItems"
        :label="t(msg.ALSO_DELETE_ALL_ASSOCIATED_WEBSITE_RULES)">
      </v-checkbox>
    </template>
  </fg-dialog>
</template>

<style scoped lang="scss">

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
