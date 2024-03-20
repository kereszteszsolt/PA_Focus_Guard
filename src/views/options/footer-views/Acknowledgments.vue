<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { useI18nStore } from '@/store';
import { computed, ref } from 'vue';
import { c as r_msg } from '@/_locales/restricted';
import { wp, wpc, IAcknowledgement } from '@/_locales/restricted/whole-pages';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const acknowledgementArray = computed(() => { return wp.getTranslatedFile(i18n.getCurrentLocaleId, wpc.ACKNOWLEDGEMENT) as IAcknowledgement[]}).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<template>
  <footer-view-wrapper :title="tr(r_msg.ACKNOWLEDGMENTS)" class="footer-view">
    <v-list lines="two" class="bg-background">
      <v-list-item v-for="acknowledgement in acknowledgementArray" :key="acknowledgement.id" class="list-item">
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold fgc-primary mb-2 title">{{acknowledgement.title}}</v-list-item-title>
          <p class="text">{{acknowledgement.text}}</p>
          <div v-if="acknowledgement.images" class="image-container">
            <v-list-item-subtitle>{{acknowledgement.textAllImg}}</v-list-item-subtitle>
            <div v-for="image in acknowledgement.images" :key="image.src" class="image-item">
              <p>{{image?.description}}</p>
              <v-img :src="image.src" :alt="image.alt" width="300"></v-img>
            </div>
          </div>
          <div v-if="acknowledgement.links" class="link-container">
            <v-list-item-subtitle v-for="link in acknowledgement.links" :key="link.url" class="link-item">
              <p class="fgc-secondary fg-font-s-16">{{link.text}}</p>
              <a :href="link.url" target="_blank" class="fgc-info">{{link.url}}</a>
            </v-list-item-subtitle>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">
.footer-view {
 // padding: 20px;
  //background-color: #f5f5f5;
}

.list-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.title {
  font-size: 1.5em;
}

.text {
  margin-bottom: 10px;
}

.image-container {
  margin-top: 10px;
}

.image-item {
  margin-bottom: 10px;
}

.link-container {
  margin-top: 10px;
}

.link-item {
  margin-bottom: 10px;
}
</style>
