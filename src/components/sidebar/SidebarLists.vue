<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';

export default {
  name: 'SidebarLists',
  data: () => {
    const websiteStore = useWebsiteStore();
    return {
      websiteStore
    };
  },
  mounted() {
    this.websiteStore.fetchData();
  },
  computed: {
    pathId() {
      return this.$route.params.id;
    }
  },
};
</script>

<template>
  <v-sheet class="sidebar-lists" color="background">
    <div v-if="!websiteStore.isLoading">
      <ul>
        <li v-for="list in websiteStore.getWebsiteLists" :key="list.id">
          <router-link :to="{ name: 'WebsitesByListId', params: { id: list.id } }">{{ list.name }}l</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }">All Websites</router-link>
        </li>
      </ul>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
.sidebar-lists {
  height: 100%;
}
</style>
