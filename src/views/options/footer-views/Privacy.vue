<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { useI18nStore } from '@/store';
import { computed, ref } from 'vue';
import { c as r_msg } from '@/_locales/restricted';
import { wp } from '@/_locales/restricted/whole-pages';
import { IPrivacy } from '@/_locales/restricted/whole-pages/IPrivacy';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const privacyArray = computed(() => { return wp.getTranslatedFile(i18n.getCurrentLocaleId, 'privacy') as IPrivacy[]}).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<template>
  <footer-view-wrapper :title="tr(r_msg.PRIVACY_POLICY)">
    <v-list lines="two" class="bg-background">
      <v-list-item v-for="privacy in privacyArray" :key="privacy.id" >
        <v-list-item-content>
          <p>{{ privacy.content }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">

</style>
