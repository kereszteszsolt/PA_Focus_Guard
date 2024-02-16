<script lang="ts">
import { useAppDataStore } from '@/store/appDataStore';
export default {
  name: 'Popup',
  data() {
    const appDataStore = useAppDataStore();
    return {
      appDataStore
    };
  },
  mounted() {
    this.appDataStore.fetchAppData();
  }
}

</script>

<template>
<v-layout>
  <v-btn v-if="appDataStore.getAppData.focusModeActive" @click="appDataStore.updateFocusModeActive(false)">Off</v-btn>
  <v-btn v-if="!appDataStore.getAppData.focusModeActive" @click="appDataStore.updateFocusModeActive(true)">On</v-btn>
</v-layout>
</template>

<style scoped lang="scss">

</style>
