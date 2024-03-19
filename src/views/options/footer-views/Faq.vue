<template>
  <footer-view-wrapper :title="tr(r_msg.QNA)">
    <v-expansion-panels color="background" multiple v-for="faqSection in faqArray" :key="faqSection.question">
      <v-expansion-panel color="background">
        <v-expansion-panel-title color="background">
          <v-icon icon="mdi-comment-question-outline" class="pr-4" color="info"></v-icon>
          {{ faqSection.question }}
        </v-expansion-panel-title>
        <v-expansion-panel-text >
          <v-list lines="one">
            <v-list-item v-for="answer in faqSection.answers" :key="answer">
              <template v-slot:prepend>
                <v-icon icon="mdi-comment-arrow-right-outline" color="info"></v-icon>
              </template>
              <v-list-item-content>
               {{ answer}}
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-for="link in faqSection?.links" :key="link.url">
              <template v-slot:prepend>
                <v-icon :icon="link.mdiIcon || 'mdi-comment-arrow-right-outline'" color="info"></v-icon>
              </template>
              <v-list-item-content>
                <v-list-item-title>
                  <div class="d-flex flex-row">
                    <div class="font-weight-bold fgc-primary pr-1">{{ link.text }}</div>
                    <div class="font-weight-bold fgc-accent">{{ link.additionalText1 }}</div>
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle class="fgc-secondary">{{ link.additionalText2 }}</v-list-item-subtitle>
                <a :href="link.url" target="_blank" class="fgc-info">{{ link.url }}</a>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </footer-view-wrapper>
</template>

<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { wp } from '@/_locales/restricted/whole-pages';
import { computed } from 'vue';
import { useI18nStore } from '@/store';
import * as utils from '@/utils';
import { c as r_msg } from '@/_locales/restricted';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});
const faqArray = computed(() => wp.getTranslatedFile(i18n.getCurrentLocaleId, 'faq')).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<style scoped lang="scss">

</style>
