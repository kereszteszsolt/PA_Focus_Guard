<script setup lang="ts">

import { useStatisticsStore } from '@/store';
import { computed } from 'vue';

const statisticStore = useStatisticsStore();
statisticStore.fetchDistractionAttempts();

const computedData = computed(() => {
  return {
    distractionAttempts: statisticStore.distractionAttempts,
  };
});

const isLoading = computed(() => {
  return statisticStore.isLoading;
});

</script>

<template>
  <div class="flex-1-0">
    <h1>Statistics Distraction Attempts</h1>
    //print same charts

  </div>
</template>

<style scoped lang="scss">

</style>
