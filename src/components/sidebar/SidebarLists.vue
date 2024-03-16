<script setup lang="ts">
import { useI18nStore, useWebsiteRulesStore } from '@/store';
import { IWebsiteRuleList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import { EditWebsiteRuleListDialog } from '@/components/websites';
import { computed, nextTick, ref, watch } from 'vue';
import { msg } from '@/constants';
import * as utils from '@/utils';
import { FgModal } from '@/components/common';
import FgFormModal from '@/components/common/FgFormModal.vue';

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
    editingRuleWebsiteList.value = websiteRulesStore.getDummyWebsiteRuleList;
    isNewItem.value = true;
    isValid.value = true;
    errorMessage.value = '';
    fieldTouched.value = false;
  });
};

const saveItem = () => {
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
  editingRuleWebsiteList.value = list ? list : websiteRulesStore.getDummyWebsiteRuleList;
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
    editingRuleWebsiteList.value = list;
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

  <fg-form-modal
    v-model:dialog="dialogEdit"
    v-model:valid="isValid"
    :max-width="'900px'"
  >
    <template v-slot:title>
      <span>{{ isNewItem ? t(msg.NEW_WEBSITE_RULE_LIST) : t(msg.EDIT_WEBSITE_RULE_LIST) }}</span>
    </template>
    <div>
      <v-text-field v-model="name" :error-messages="errorMessage"
                    :label="t(msg.NAME_OF_WEBSITE_RULE_LIST)"
                    @blur="touched" required :suffix="name.length + '/25'">
      </v-text-field>
    </div>
    <template v-slot:actions>
      <v-btn @click="closeEditDialog" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
      <v-btn @click="saveItem" color="danger" variant="elevated" elevation="8">{{ t(msg.SAVE) }}</v-btn>
    </template>
  </fg-form-modal>

  <fg-modal
    v-model:dialog="dialogDelete"
    :max-width="'900px'"
  >
    <template v-slot:title>
      <span>{{ t(msg.DELETE_WEBSITE_RULE_LIST) }}</span>
    </template>
    <div class="d-flex flex-column text-body-1">
      {{ t(msg.ARE_YOU_SURE_DELETE_THIS_WEBSITE_RULE_LIST) }}
      <div>
        <v-icon>mdi-chevron-double-right</v-icon>
        {{ editingRuleWebsiteList.name }}
        <v-icon>mdi-chevron-double-left</v-icon>
      </div>
    </div>
    <v-divider v-if="!isEmpty" class="mx-1 my-2"></v-divider>
    <div class="d-flex flex-column text-body-2" v-if="!isEmpty">
      <span>{{ t(msg.THE_WEBSITE_RULE_LIST_IS_NOT_EMPTY) }}</span>
      <v-checkbox
        color="danger" v-if="!isEmpty" v-model="confirmDeleteListItems"
        :label="t(msg.ALSO_DELETE_ALL_ASSOCIATED_WEBSITE_RULES)">
      </v-checkbox>
    </div>
    <template v-slot:actions>
      <v-btn @click="closeDelete" color="success" variant="elevated" elevation="8">{{ t(msg.CANCEL) }}</v-btn>
      <v-btn @click="deleteItemConfirm" color="danger" variant="elevated" elevation="8"
             :disabled="!isEmpty && !confirmDeleteListItems">
        {{ t(msg.DELETE) }}
      </v-btn>
    </template>
  </fg-modal>
</template>

<style scoped lang="scss">

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
