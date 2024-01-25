<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';
import { IWebsiteList } from '@/interfaces';

export default {
  name: 'SidebarLists',
  data: () => {
    const websiteStore = useWebsiteStore();
    let dialog = false;
    let newWebsiteList: IWebsiteList = {
      id: '',
      name: '',
      order: 0
    };
    return {
      websiteStore,
      dialog,
      newWebsiteList
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
  methods: {
    close() {
      this.dialog = false;
    },
    save() {
      this.websiteStore.addWebsiteList(this.newWebsiteList);
      this.close();
    }}
};
</script>

<template>
  <v-sheet class="sidebar-lists" color="background">
    <div v-if="!websiteStore.isLoading">
      <v-list>
        <v-list-item v-for="list in websiteStore.getWebsiteLists" :key="list.id">
          <v-list-item-content>
            <router-link :to="{ name: 'WebsitesByListId', params: { id: list.id } }" class="router-link">{{ list.name }}</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }" class="router-link">All Websites</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-sheet>
  <v-btn @click="dialog = true" color="primary" dark>Add Website List</v-btn>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Website List</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="newWebsiteList.name"
                label="Name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.sidebar-lists {
  height: 100%;
}
.v-list-item {
  font-size: 1.2rem;
}
.router-link {
  text-decoration: none;
  color: inherit;
  font-weight: 500;
}
</style>
