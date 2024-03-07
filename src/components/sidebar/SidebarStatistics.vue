<script setup lang="ts">

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0 pa-4" color="background">
    <div class="d-flex flex-column justify-space-around">
      <v-btn to="/websites" size="x-large" color="accent" variant="elevated" elevation="12" class="w-100 mb-1">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/statistics/distraction-attempts" size="x-large" color="accent" variant="elevated" elevation="12"
             class="w-100 mb-1">
        <v-icon>mdi-chart-bar-stacked</v-icon>
      </v-btn>
      <v-btn to="/statistics/data-usage" size="x-large" color="accent" variant="elevated" elevation="12"
             class="w-100 mb-1">
        <v-icon>mdi-chart-donut</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
