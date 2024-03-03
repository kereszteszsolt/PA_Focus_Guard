<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18nStore } from '@/store';
import { EditCustomLanguageDialog } from '@/components/languages';
import { FooterSocialModal } from '@/components/footer';
import { ISocialMediaLink } from '@/interfaces';

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
    instruction: 'Kattints s kövess be!',
    url: 'https://www.facebook.com/KeresztesZsolt.kzs'
  },
  {
    id: 'twitter',
    platform: 'Twitter',
    icon: 'mdi-twitter',
    name: 'Keresztes Zsolt',
    identifier: '@KeresztesZsolti',
    description: 'Twitter oldalam',
    instruction: 'Kattints s kövess be!',
    url: 'https://twitter.com/KeresztesZsolti'
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: 'mdi-instagram',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsol_kzs',
    description: 'Instagram oldalam',
    instruction: 'Kattints s kövess be!',
    url: 'https://www.instagram.com/kereszteszsolt_kzs'
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: 'mdi-linkedin',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsolt',
    description: 'LinkedIn oldalam',
    instruction: 'Kattints s kövess be!',
    url: 'https://www.linkedin.com/in/kereszteszsolt/'
  },
  {
    id: 'youtube-hu',
    platform: 'YouTube',
    icon: 'mdi-youtube',
    name: 'Keresztes Zsolt - Vlog,Önfejlesztés,Tudomány&Tech',
    identifier: '@KeresztesZsolt',
    description: 'YouTube csatornám',
    instruction: 'Kattints s kövess be!',
    url: 'https://www.youtube.com/@KeresztesZsolt'
  },
  {
    id: 'youtube-en',
    platform: 'YouTube',
    icon: 'mdi-youtube',
    name: 'Keresztes Zsolt - Vlog, Self-Dev, Science&Tech',
    identifier: '@KeresztesZsolti',
    description: 'YouTube channel',
    instruction: 'Click and follow!',
    url: 'https://www.youtube.com/@KeresztesZsolti'
  },
  {
    id: 'github',
    platform: 'GitHub',
    icon: 'mdi-github',
    name: 'Keresztes Zsolt',
    identifier: '@kereszteszsolt',
    description: 'GitHub oldalam',
    instruction: 'Kattints s kövess be!',
    url: 'https://github.com/kereszteszsolt'
  },
];

const getSocialMediaLinkByPlatformName = (platformName: string) => {
  return socialMediaLinks.find((link) => link.id === platformName) || {} as ISocialMediaLink;
};

</script>


<template>
  <v-sheet color="background"
           class="border-bottom-radius-8 fg-h-104px d-flex flex-column justify-space-between px-5 py-2">
    <div class="d-flex flex-row justify-space-around">
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('facebook')" color="info">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('twitter')" color="info">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('instagram')" color="info">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('linkedin')" color="info">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('youtube-hu')" color="info">
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('youtube-en')" color="info">
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('github')" color="info">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('coffee')" color="info">
        <v-icon>mdi-coffee</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0" @click="openSocialDialog('tree')" color="info">
        <v-icon>mdi-tree</v-icon>
      </v-btn>
    </div>
    <!--    <div class="d-flex flex-row justify-space-around">-->
    <!--          <router-link to="/about" class="text-none text-center flex-1-0">About</router-link>-->
    <!--          <router-link to="/gtc" class="text-none text-center flex-1-0">Gtc</router-link>-->
    <!--          <router-link to="/donation" class="text-none text-center flex-1-0">Donation</router-link>-->
    <!--          <router-link to="/acknowledgment" class="text-none text-center flex-1-0">Acknowledgment</router-link>-->
    <!--          <router-link to="/how-to-use" class="text-none text-center flex-1-0">How to use</router-link>-->
    <!--    </div>-->
    <div class="d-flex flex-row justify-space-around">
      <v-btn
        to="/about"
        variant="text"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular"
        density="compact"
        size="small"
        color="info"
      >
        About
      </v-btn>

      <v-btn
        to="/gtc"
        variant="text"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular"
        density="compact"
        size="small"
        color="info"
      >
        Gtc
      </v-btn>

      <v-btn
        to="/donation"
        variant="text"
        density="compact"
        size="small"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular"
        color="info"
      >
        Donation
      </v-btn>

      <v-btn
        to="/acknowledgment"
        variant="text"
        density="compact"
        size="small"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular"
        color="info"
      >
        Acknowledgment
      </v-btn>

      <v-btn
        to="/how-to-use"
        variant="text"
        density="compact"
        size="small"
        class="text-none text-center flex-1-0 text-decoration-none font-weight-regular"
        color="info"
      >
        How to use
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-around text-center">
      <p class="info">Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software.</p>
    </div>
    <footer-social-modal :t="t" :p-dialog="socialDialog"
                         :social-media-link="getSocialMediaLinkByPlatformName(contextSocialPage)"
                         :p-close-dialog="closeSocialDialog"/>
  </v-sheet>
</template>

<style scoped lang="scss">
.info {
  color: rgb(var(--v-theme-info));
}
</style>
