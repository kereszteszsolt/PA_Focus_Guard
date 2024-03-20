<template>
  <footer-view-wrapper :title="tr(r_msg.GTC)">
    <v-list lines="two" class="bg-background">
      <v-list-item v-for="(gtc, index) in gtcArray" :key="gtc.id">
        <v-list-item-content>
          <v-list-item-title>
            <div class="font-weight-bold fgc-primary pr-1" >{{ gtc.title }}</div>
          </v-list-item-title>
          <p v-for="c in gtc.content" :class="{'finally fgc-accent': index === gtcArray.length - 1}" v-html="c"></p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </footer-view-wrapper>
</template>

<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { wp } from '@/_locales/restricted/whole-pages';
import { computed } from 'vue';
import { useI18nStore } from '@/store';
import * as utils from '@/utils';
import { c as r_msg } from '@/_locales/restricted';
import { IGtc } from '@/_locales/restricted/whole-pages/IGtc';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
utils.runtimeMessages.createBatchMessageListenerM2O(['localeSettingsUpdated', 'localeMessagesUpdated'], () => {
  i18n.fetchLocaleSettingsAndMessages();
});
const gtcArray = computed(() => {
  return wp.getTranslatedFile(i18n.getCurrentLocaleId, 'gtc') as IGtc[];
}).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<style scoped lang="scss">
.finally{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
  width: 100%;
}
</style>
