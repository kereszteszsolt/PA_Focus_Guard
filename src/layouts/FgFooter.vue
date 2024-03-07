<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18nStore } from '@/store';
import { EditCustomLanguageDialog } from '@/components/languages';
import { FooterSocialModal } from '@/components/footer';
import { ISocialMediaLink } from '@/interfaces';
import { msg } from '@/constants';
import * as links from '@/links';

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

const socialMediaLinks: ISocialMediaLink[] = [
  {
    id: 'facebook',
    platform: 'Facebook',
    icon: 'mdi-facebook',
    name: 'Keresztes Zsolt',
    identifier: '@KeresztesZsolt.kzs',
    description: 'Facebook oldalam',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_FACEBOOK,
    url: 'https://www.facebook.com/KeresztesZsolt.kzs'
  },
  {
    id: 'twitter',
    platform: 'Twitter',
    icon: 'mdi-twitter',
    name: 'Keresztes Zsolt',
    identifier: '@KeresztesZsolti',
    description: 'Twitter oldalam',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_TWITTER,
    url: 'https://twitter.com/KeresztesZsolti'
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: 'mdi-instagram',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsol_kzs',
    description: 'Instagram oldalam',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_INSTAGRAM,
    url: 'https://www.instagram.com/kereszteszsolt_kzs'
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: 'mdi-linkedin',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsolt',
    description: 'LinkedIn oldalam',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_LINKEDIN,
    url: 'https://www.linkedin.com/in/kereszteszsolt/'
  },
  {
    id: 'youtube-hu',
    platform: 'YouTube',
    icon: 'mdi-youtube',
    name: 'Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech',
    identifier: '@KeresztesZsolt',
    description: 'YouTube csatornám',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_YOUTUBE,
    url: 'https://www.youtube.com/@KeresztesZsolt'
  },
  {
    id: 'youtube-en',
    platform: 'YouTube',
    icon: 'mdi-youtube',
    name: 'Keresztes Zsolt - Vlog, Self-Dev, Science&Tech',
    identifier: '@KeresztesZsolti',
    description: 'YouTube channel',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_YOUTUBE,
    url: 'https://www.youtube.com/@KeresztesZsolti'
  },
  {
    id: 'github',
    platform: 'GitHub',
    icon: 'mdi-github',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsolt',
    description: 'GitHub oldalam',
    instruction: msg.CLICK_AND_FALLOW_ME_ON_GITHUB,
    url: 'https://github.com/kereszteszsolt'
  },
  {
    id: 'coffee',
    platform: 'BuyMeACoffee',
    icon: 'mdi-coffee',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsolt',
    description: 'Buy me a coffee',
    instruction: 'msg.CLICK_AND_BUY_ME_A_COFFEE',
    url: 'https://www.buymeacoffee.com/kereszteszsolt'
  },
  {
    id: 'tree',
    platform: 'Tree',
    icon: 'mdi-tree',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsolt',
    description: 'Tree planting',
    instruction: 'msg.CLICK_AND_PLANT_A_TREE',
    url: 'https://www.trees.org/sponsor/kereszteszsolt'
  }
];

const getSocialMediaLinkByPlatformName = (platformName: string) => {
  return socialMediaLinks.find((link) => link.id === platformName) || {} as ISocialMediaLink;
};

</script>


<template>
  <v-sheet color="background"
           class="border-bottom-radius-8 fg-h-104px d-flex flex-column justify-space-between px-4 py-2">
    <div class="d-flex flex-row justify-space-between">
            <v-btn v-for="link in socialMediaLinks" variant="text" class="flex-1-0" @click="openSocialDialog(link.id)" color="info" density="compact">
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <v-btn
        v-for="link in links.footerViewLinks"
        :to="link.url"
        variant="text"
        density="compact"
        size="small"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular"
        color="info"
      >
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
