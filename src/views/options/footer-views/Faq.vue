<template>
  <footer-view-wrapper title="How to Use">
      <v-expansion-panels color="background" multiple v-for="faqSection in faqArray" :key="faqSection.question">
        <v-expansion-panel :title="faqSection.question" color="background">
          <v-expansion-panel-text color="background">
            <ul class=" list-disc pl-8">
              <li v-for="answer in faqSection.answers" :key="answer">{{ answer }}</li>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>


      <p class="pt-4 font-weight-bold">How to Use Focus Guard? (Video) English</p>
      <a href="https://www.youtube.com/watch?v=EsUjbbI75Io"
         target="_blank">https://www.youtube.com/watch?v=EsUjbbI75Io</a>

      <p class="pt-4 font-weight-bold">How to Use Focus Guard? (Video) Hungarian</p>
      <a href="https://www.youtube.com/watch?v=7LSU5hTgSmc"
         target="_blank">https://www.youtube.com/watch?v=7LSU5hTgSmc</a>
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
const faqArray =  computed(() => wp.getTranslatedFile(i18n.getCurrentLocaleId,'faq')).value;
</script>

<style scoped lang="scss">

</style>
