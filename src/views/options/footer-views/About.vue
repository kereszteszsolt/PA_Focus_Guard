<script setup lang="ts">
import { useI18nStore } from '@/store';
import { computed } from 'vue';
import { wp, wpc, IAbout } from '@/_locales/restricted/whole-pages';
import { FooterViewWrapper } from '@/views/options';
import { c as r_msg } from '@/_locales/restricted';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const aboutArray = computed(() => {
  return wp.getTranslatedFile(i18n.getCurrentLocaleId, wpc.ABOUT) as IAbout[];
}).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<template>
  <footer-view-wrapper :title="tr(r_msg.ABOUT)" class="footer-view">
    <v-list class="bg-background">
      <v-list-item-group>
        <v-list-item v-for="item in aboutArray" :key="item.id" class="list-item">
          <v-list-item-content>
            <v-list-item-title class="title">{{item.title}}</v-list-item-title>
            <p class="text">{{item.text}}</p>
            <ul v-if="item.list" class="sub-list">
              <li v-for="(listItem, index) in item.list" :key="index">
                <p>{{listItem}}</p>
              </li>
            </ul>
            <ul v-if="item.links" class="link-list">
              <li v-for="link in item.links" :key="link.url">
                <div>
                  <p class="fgc-secondary fg-font-s-16">{{link.text}}</p>
                  <a :href="link.url" target="_blank" class="fgc-info">{{link.url}}</a>
                </div>
              </li>
            </ul>
            <p v-if="item.signature" class="signature">{{item.signature}}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">

.title {
  font-size: 1.5em;
}

.text {
  margin-bottom: 10px;
}

.sub-list, .link-list {
  padding-left: 20px;
}

.signature {
  font-style: italic;
  margin-top: 20px;
}
</style>
