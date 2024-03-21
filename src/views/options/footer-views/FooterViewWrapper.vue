<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="flex-1-0">
    <v-card class="border-top-radius-8 border-bottom-radius-0 fw-card min-width-700" color="background" elevation="0">
      <v-card-item class="border-top-radius-8">
        <v-card-title class="text-h6 border-top-radius-8">
          <div class="font-weight-bold border-top-radius-8">
            {{ title }}
          </div>
        </v-card-title>
      </v-card-item>
      <div class="fgScroll">
        <v-card-text class="fgScroll fw-card-text">
          <slot></slot>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.min-width-700 {
  min-width: 700px;
}
</style>
