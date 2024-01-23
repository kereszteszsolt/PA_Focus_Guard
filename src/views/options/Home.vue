<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';
import { onMounted } from 'vue';
import { IWebsite } from '@/interfaces';

export default {
  name: 'Home',
  setup() {
    const websiteStore = useWebsiteStore();

    onMounted(() => {
      websiteStore.fetchData();
    });

    return {
      websiteStore,
      headers: [
        { title: 'URL', value: 'url' },
        { title: 'Permanently Active', value: 'permanentlyActive' },
        { title: 'Temporarily Inactive', value: 'temporarilyInactive' },
        { title: 'Actions', value: 'actions' }
      ]
    };
  },
  methods: {
    setPermanentlyActive(item: IWebsite) {
      item.temporarilyInactive = item.permanentlyActive ? false : item.temporarilyInactive;
      this.websiteStore.saveWebsites();
    },
    setTemporarilyInactive(item: IWebsite) {
      item.permanentlyActive = item.temporarilyInactive ? false : item.permanentlyActive;
      this.websiteStore.saveWebsites();
    }
  }
};
</script>

<template>
  <div v-if="!websiteStore.isLoading">
    <div v-if="websiteStore.getAllWebsites.length === 0">No Websites</div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="websiteStore.getAllWebsites"
        class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="websiteStore.deleteWebsite(item.id)">mdi-delete</v-icon>
          <v-icon small>mdi-pencil</v-icon>
          <v-icon small>mdi-arrow-up</v-icon>
          <v-icon small>mdi-arrow-down</v-icon>
        </template>
        <template v-slot:item.permanentlyActive="{ item }">
          <v-checkbox
            v-model="item.permanentlyActive"
            color="primary"
            @change="setPermanentlyActive(item)"
            hide-details>
          </v-checkbox>
        </template>
        <template v-slot:item.temporarilyInactive="{ item }">
          <v-checkbox
            v-model="item.temporarilyInactive"
            color="primary"
            @change="setTemporarilyInactive(item)"
            hide-details>
          </v-checkbox>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Website List</v-toolbar-title>
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
