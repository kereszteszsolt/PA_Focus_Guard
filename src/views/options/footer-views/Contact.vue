<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { socialMediaLinks } from '@/links';
import { useI18nStore } from '@/store';
import { computed, ref } from 'vue';
import { c as r_msg } from '@/_locales/restricted';
import * as links from '@/links';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;

const orderedLinks = computed(() => {
  return links.socialMediaLinks.sort((a, b) => a.contactOrder - b.contactOrder).filter((link) => link.contactOrder > 0);
});
</script>

<template>
  <footer-view-wrapper title="Contact">
    <v-list lines="two" class="bg-background">
      <v-list-item v-for="link in orderedLinks" :key="link.profileIdentifier" >
        <template v-slot:prepend>
          <v-icon :icon="link.mdiIcon" color="info"></v-icon>
        </template>
        <v-list-item-content>
          <v-list-item-title>
            <div class="d-flex flex-row">
              <div class="font-weight-bold fgc-primary pr-1">{{ link.profileName }}</div>
              <div class="font-weight-bold fgc-accent">{{ link.profileIdentifier }}</div>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>{{ link.platformName}}</v-list-item-subtitle>
          <a :href="link.url" target="_blank">{{ link.url }}</a>
          <p>{{ tr(link.shortDescription) }}</p>
          <p>{{ tr(link.callToAction) }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">

</style>
