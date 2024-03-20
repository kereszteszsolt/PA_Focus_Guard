<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
import { useI18nStore } from '@/store';
import { computed, ref } from 'vue';
import { c as r_msg } from '@/_locales/restricted';
import { wp, wpc, IDonation } from '@/_locales/restricted/whole-pages';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const donationArray = computed(() => { return wp.getTranslatedFile(i18n.getCurrentLocaleId, wpc.DONATION) as IDonation[]}).value;
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<template>
  <footer-view-wrapper :title="tr(r_msg.DONATIONS)" class="footer-view">
    <v-list lines="two" class="bg-background">
      <v-list-item v-for="donation in donationArray" :key="donation.id" class="list-item">
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold fgc-primary mb-2 title">{{donation.title}}</v-list-item-title>
          <p class="text">{{donation.text}}</p>
          <ul>
            <li v-for="item in donation.list" :key="item"><v-icon color="info" class="px-1">mdi-arrow-right-bold</v-icon>{{item}}</li>
          </ul>
          <div v-if="donation.image" class="image-container">
            <v-img :src="donation.image" :alt="donation.title" width="300"></v-img>
          </div>
          <div v-if="donation.link" class="link-container">
            <v-list-item-subtitle class="link-item">
              <p class="fgc-secondary fg-font-s-16">{{donation.link.text}}</p>
              <div class="d-flex flex-row">
                <div class="fgc-primary font-weight-bold mr-1">{{donation?.name}}</div>
                <div class="fgc-accent font-weight-bold">{{donation?.identifier}}</div>
              </div>
              <a :href="donation.link.url" target="_blank" class="fgc-info font-weight-bold">{{donation.link.url}}</a>
            </v-list-item-subtitle>
          </div>
          <p v-if="donation.signature" class="signature fgc-accent">{{donation.signature}}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">
.list-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  font-size: 16px;
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

.link-container {
  margin-top: 10px;
}

.link-item {
  margin-bottom: 10px;
}

.signature {
  font-weight: bold;
  font-style: italic;
  margin-top: 20px;
}
</style>
