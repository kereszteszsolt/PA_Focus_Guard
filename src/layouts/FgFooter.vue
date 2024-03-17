<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { FgDialog } from '@/components/common';
import { useI18nStore } from '@/store';
import { ISocialMediaLink } from '@/interfaces';
import { msg } from '@/constants';
import * as links from '@/links';
import * as utils from '@/utils';
import { c as r_msg } from '@/_locales/restricted';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const socialDialog = ref(false);
const contextLink = ref({} as ISocialMediaLink);

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
const tc = (t1: string, t2:string) => computed(() => i18n.getChooseTranslation(t1, t2, 'hu')).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;

const openSocialDialog = (link: ISocialMediaLink) => {
  socialDialog.value = true;
  contextLink.value = link;
};
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});

</script>

<template>
  <v-sheet color="background"
           class="border-bottom-radius-8 fg-h-104px d-flex flex-column justify-space-between px-4 py-2">
    <div class="d-flex flex-row justify-space-between">
      <v-btn v-for="link in links.socialMediaLinks" variant="text" class="flex-1-0"
             id="#fgModal" color="info" density="compact" @click="openSocialDialog(link)">
        <v-icon>{{ link.mdiIcon }}</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <v-btn
        v-for="link in links.footerViewLinks" :to="link.url" variant="text" density="compact" size="small"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular" color="info">
        {{ tc(link.title_hu, link.title_en) }}
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-around text-center">
      <p class="fgc-info">Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software.</p>
    </div>
  </v-sheet>
  <fg-dialog v-model:dialog="socialDialog" activator="#fgModal" max-width="600px">
    <template v-slot:title>
      <h2 class="mb-2 fg-font-s-24">{{ contextLink.platformName }}</h2>
    </template>
    <div class="fg-font-s-16 d-flex flex-column px-3">
      <div class="mb-1 font-weight-bold">{{ tr(r_msg.THANK_Y4Y_INTEREST) }}</div>
      <div> {{ tr(r_msg.NOT_PART_OF_EXTENSION) }}</div>
      <div>{{ tr(r_msg.CLICK_OPEN_NEW_TAB) }}</div>
      <div class="my-2 fg-font-s-16 d-flex flex-column">
        <div class="d-flex flex-row">
          <div class="font-weight-bold fgc-primary mr-1">{{ contextLink.profileName }}</div>
          <div class="font-weight-bold fgc-accent">{{ contextLink.profileIdentifier }}</div>
        </div>
        <a class="fgc-info" :href="contextLink.url" target="_blank">{{ contextLink.url }}</a>
      </div>
      <div class="mb-2">{{ tr(contextLink.shortDescription) }}</div>
      <div class="mb-2">{{ tr(contextLink.callToAction) }}</div>
    </div>
    <template v-slot:actions>
      <v-btn color="danger" variant="elevated" elevation="12" @click="socialDialog = false">{{ t(msg.CLOSE) }}</v-btn>
    </template>
  </fg-dialog>
</template>

<style scoped lang="scss">
.dialog-title {
  font-size: 24px;
  margin-bottom: 12px;
}

.dialog-content {
  padding: 20px;
}
</style>
