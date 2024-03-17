<script setup lang="ts">
import { computed, ref } from 'vue';
import { FgDialog } from '@/components/common';
import { useI18nStore } from '@/store';
import { ISocialMediaLink } from '@/interfaces';
import { msg } from '@/constants';
import * as links from '@/links';

const { fetchLocaleSettingsAndMessages, getTranslation } = useI18nStore();
fetchLocaleSettingsAndMessages();

const socialDialog = ref(false);
const contextLink = ref({} as ISocialMediaLink);

const t = (key: string) => computed(() => getTranslation(key)).value;

const openSocialDialog = (link: ISocialMediaLink) => {
  socialDialog.value = true;
  contextLink.value = link;
};

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
        {{ t(link.title) }}
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-around text-center">
      <p class="fgc-info">Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software.</p>
    </div>
  </v-sheet>
  <fg-dialog v-model:dialog="socialDialog" activator="#fgModal" max-width="600px">
    <template v-slot:title>
      {{ contextLink.platformName }}
    </template>
    <div>
      <p class="font-weight-bold">{{ t(msg.THANK_Y4Y_INTEREST) }}</p>
      <p>{{ t(msg.NOT_PART_OF_EXTENSION) }}</p>
      <p>{{ t(msg.CLICK_OPEN_NEW_TAB) }}</p>
      <p>
        <span class="font-weight-bold fgc-primary">{{ contextLink.profileName }}</span>&nbsp;
        <span class="font-weight-bold fgc-accent">{{ contextLink.profileIdentifier }}</span>&nbsp;
        <a :href="contextLink.url" target="_blank">{{ contextLink.url }}</a>
      </p>
      <p>{{ t(contextLink.shortDescription) }}</p>
      <p>{{ t(contextLink.callToAction) }}</p>
    </div>
    <template v-slot:actions>
      <v-btn color="danger" variant="elevated" elevation="12" @click="socialDialog = false">{{ t(msg.CLOSE) }}</v-btn>
    </template>
  </fg-dialog>
</template>

<style scoped lang="scss">

</style>
