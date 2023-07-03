<template>
  <h1>{{ componentTitle }}</h1>
  <h1>{{ storageName }}</h1>
  <div class="sites-container">
    <div class="sites-list">
      <table>
        <thead>
        </thead>
        <tbody>
        <tr class="site" v-for="site in websiteList">
          <td><input type="checkbox" :id="site.name" :checked="site.checked"
                     @change="changeSitePermission(site.name)"/></td>
          <td><label :for="site.name">{{ site.name }}</label></td>
          <td>
            <button @click="removeSite(site.name)" class="remove-site">X</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    componentTitle: {
      type: String,
      required: true
    },
    storageName: {
      type: String,
      required: true
    },
    defaultWebsites: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      websiteList: [],
      newWebsite: '',
      showInvalidErrorMessage: false,
      showDuplicatedErrorMessage: false
    };
  },
  watch: {
    storageName: {
      immediate: true,
      handler: "loadListOfWebsites"
    }
  },
  created() {
    this.loadListOfWebsites()
  },
  methods: {
    loadListOfWebsites() {
      chrome.storage.sync.get(this.storageName, (data) => {
        if (data[this.storageName]) {
          this.websiteList = JSON.parse(data[this.storageName]);
        } else {
          this.websiteList = this.defaultWebsites;
        }
      });
    },
    saveListOfWebsites() {
      chrome.storage.sync.set({[this.storageName]: JSON.stringify(this.websiteList)});
    },
    removeSite(siteName) {
      this.websiteList = this.websiteList.filter((site) => site.name !== siteName);
      this.saveListOfWebsites();
    },
    changeSitePermission(siteName) {
      this.websiteList = this.websiteList.map((site) => {
        if (site.name === siteName) {
          site.checked = !site.checked;
        }
        return site;
      });
      this.saveListOfWebsites();
    }
  }
};
</script>
