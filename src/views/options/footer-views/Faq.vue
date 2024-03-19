<template>
  <footer-view-wrapper title="How to Use">
    <v-expansion-panels color="background" multiple v-for="faqSection in faqArray" :key="faqSection.question">
      <v-expansion-panel :title="faqSection.question" color="background">
        <v-expansion-panel-text color="background">
          <ul class=" list-disc pl-8">
            <li v-for="answer in faqSection.answers" :key="answer">{{ answer }}</li>
            <li v-for="link in faqSection?.links" :key="link.url" class="d-flex flex-column">
              <div class="d-flex flex-row font-weight-bold">
                <div class="fgc-primary">{{ link.text }}</div> &nbsp;
                <div class="fgc-accent">{{ link?.additionalText1 }}</div>
              </div>
              <div class="fgc-secondary">{{ link?.additionalText2 }}</div>
              <a :href="link.url" target="_blank" rel="noopener noreferrer" class="fgc-info">{{ link.url }}</a>
            </li>
          </ul>
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

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});
const faqArray = computed(() => wp.getTranslatedFile(i18n.getCurrentLocaleId, 'faq')).value;
</script>

<style scoped lang="scss">

</style>
