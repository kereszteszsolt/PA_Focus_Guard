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
  <footer-view-wrapper :title="tr(r_msg.ACKNOWLEDGMENTS)">
    <v-list lines="two" class="bg-background">
      <v-list-item v-for="acknowledgement in acknowledgementArray" :key="acknowledgement.id" >
        <v-list-item-content>
          <v-list-item-title>{{acknowledgement.title}}</v-list-item-title>
          <p>{{acknowledgement.text}}</p>
          <div v-if="acknowledgement.images">
            <v-list-item-subtitle>{{acknowledgement.textAllImg}}</v-list-item-subtitle>
            <div v-for="image in acknowledgement.images" :key="image.src">
              <p>{{image?.description}}</p>
              <v-img :src="image.src" :alt="image.alt" width="100" height="100"></v-img>
            </div>
          </div>
          <div v-if="acknowledgement.links">
            <v-list-item-subtitle v-for="link in acknowledgement.links" :key="link.url">
              <p>{{link.text}}</p>
              <a :href="link.url" target="_blank">{{link.url}}</a>
            </v-list-item-subtitle>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">

</style>
