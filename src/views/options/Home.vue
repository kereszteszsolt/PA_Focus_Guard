<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';

export default {
  name: 'Home',
  setup() {
    const websiteStore = useWebsiteStore();
    return {
      websiteStore
    };
  },
  mounted() {
    this.websiteStore.fetchData();
  }
}
</script>

<template>
  <div>Home</div>
  <div v-if="!websiteStore.isLoading">
    <div v-if="websiteStore.getAllWebsites.length === 0">No Websites</div>
    <div v-else>
      <div v-for="website in websiteStore.getAllWebsites" :key="website.id">
        {{ website.url }}
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped lang="scss">
</style>
