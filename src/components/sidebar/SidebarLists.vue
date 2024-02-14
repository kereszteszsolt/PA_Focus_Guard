<script lang="ts">
import { useWebsiteStore } from '@/store/websiteStore';
import { IWebsiteList } from '@/interfaces';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';

export default {
  name: 'SidebarLists',
  components: { SidebarListItem },
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
      this.newWebsiteList = {
        id: '',
        name: '',
        order: 0
      };
      this.close();
    }
  }
};
</script>

<template>
  <v-sheet class="sidebar-lists" color="background">
    <div v-if="!websiteStore.isLoading">
      <v-list>
        <router-link v-for="list in websiteStore.getWebsiteLists" :key="list.id"
                     :to="{ name: 'WebsitesByListId', params: { id: list.id } }" class="router-link">
          <sidebar-list-item :list-id="list.id" :list-name="list.name"
                              :delete-item="websiteStore.deleteWebsiteList"
                              :edit-item="() => {}"
                              :move-up="() => {}"
                              :move-down="() => {}"
          ></sidebar-list-item>
        </router-link>
        <v-divider></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <v-btn density="compact" icon="mdi-plus" @click="dialog = true"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <router-link :to="{ name: 'WebsitesByListId', params: { id: 'all' } }" class="router-link">
          <v-list-item title="All Websites" value="all"></v-list-item>
        </router-link>
      </v-list>
    </div>
  </v-sheet>
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

.v-list-item-title {
  font-size: 1.2rem;
  font-weight: 1200;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
