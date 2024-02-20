<script lang="ts">
import { defineComponent } from 'vue';
import focus from '@/assets/focus.jpg';
import { useWebsiteRulesStore, useStatisticsStore, useAppDataStore } from '@/store';

export default defineComponent({
  name: 'FocusMessage',
  data() {
    const websiteRulesStore = useWebsiteRulesStore();
    const statisticsStore = useStatisticsStore();
    const appDataStore = useAppDataStore();

    return {
      websiteRulesStore,
      statisticsStore,
      appDataStore,
      message: 'This is a focus message',
      dialog: true,
      focus
    };
  },
  computed: {
    pathId() {
      return this.$route.params.id as string;
    },
    isLoading() {
      return this.websiteRulesStore.isLoading || this.statisticsStore.isLoading || this.appDataStore.isLoading;
    }
  },
  mounted() {
    this.statisticsStore.fetchDistractionAttempts();
    this.websiteRulesStore.fetchData();
    this.statisticsStore.fetchDistractionAttempts();
   // this.saveDistractionAttempt();
  },
  watch: {
  },
  methods: {
    // saveDistractionAttempt() {
    //   const websiteRule = this.websiteRulesStore.getWebsiteRuleById(this.pathId);
    //   if (websiteRule) {
    //     const distractionAttempt = {
    //       id : '',
    //       url: websiteRule.url,
    //       focusMode: true,
    //       permanentlyActive: websiteRule.permanentlyActive,
    //     };
    //     this.statisticsStore.addNewDistractionAttempt(distractionAttempt);
    //   }
    // }
  }
});
</script>

<template>
  <v-dialog v-model="dialog" size="100%" persistent>
    <v-card>
      <v-img :src="focus" contain/>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
