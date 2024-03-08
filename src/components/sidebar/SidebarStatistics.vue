<script setup lang="ts">

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">

    <v-list class="bg-background border-radius-8 flex-1-0">
      <router-link to="/statistics/distraction-attempts" class="router-link">
        <v-list-item color="primary" :value="'distraction-attempts'">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-bar-stacked"></v-icon>
          </template>
          <v-list-item-title v-text="'Distraction Attempts'"></v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/statistics/data-usage" class="router-link">
        <v-list-item color="primary" :value="'data-usage'">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-donut"></v-icon>
          </template>
          <v-list-item-title v-text="'Data Usage'"></v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.router-link{
  text-decoration: none;
  color: inherit;
}
</style>
