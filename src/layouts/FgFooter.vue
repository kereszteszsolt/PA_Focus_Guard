<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18nStore } from '@/store';
import { FooterSocialModal } from '@/components/footer';
import { ISocialMediaLink } from '@/interfaces';
import * as links from '@/links';
import { socialMediaLinks } from '@/links';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

let socialDialog = ref(false);
let contextSocialPage = ref('');

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;

const openSocialDialog = (page: string) => {
  contextSocialPage.value = page;
  socialDialog.value = true;
};
const closeSocialDialog = () => {
  contextSocialPage.value = '';
  socialDialog.value = false;
};
const getSocialMediaLinkByPlatformName = (platformName: string) => {
  return socialMediaLinks.find((link) => link.platformName === platformName) || {} as ISocialMediaLink;
};
</script>

<template>
  <v-sheet color="background"
           class="border-bottom-radius-8 fg-h-104px d-flex flex-column justify-space-between px-4 py-2">
    <div class="d-flex flex-row justify-space-between">
      <v-btn v-for="link in socialMediaLinks" variant="text" class="flex-1-0"
             @click="openSocialDialog(link.platformName)" color="info" density="compact">
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
    <footer-social-modal :t="t" :p-dialog="socialDialog"
                         :social-media-link="getSocialMediaLinkByPlatformName(contextSocialPage)"
                         :p-close-dialog="closeSocialDialog"/>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
