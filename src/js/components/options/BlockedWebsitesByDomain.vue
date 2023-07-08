<template>
  <h1>{{ title }}</h1>
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
  <div class="add-site-container">
    <p>Add site:</p>
    <div class="input-wrapper">
      <input type="text" placeholder="example.com" v-model="newWebsite" @blur="handleBlur"/>
      <button @click="addWebsite" class="add-site">Add</button>
    </div>
    <label v-if="showInvalidErrorMessage" class="error-message">Invalid domain</label>
    <label v-if="showDuplicatedErrorMessage" class="error-message">Duplicated domain</label>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title:{
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true,
    },
    containerComponent: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    defaultData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      websiteList: [...this.data],
      newWebsite: '',
      showInvalidErrorMessage: false,
      showDuplicatedErrorMessage: false
    };
  },
  watch: {
    name: {
      immediate: true,
      handler: 'loadListOfWebsites'
    }
  },
  created() {
   this.loadListOfWebsites();
  },
  methods: {
    loadListOfWebsites() {
      chrome.storage.sync.get(this.storageName, (data) => {
        if (data[this.storageName]) {
          this.websiteList = JSON.parse(data[this.storageName]);
        } else {
          this.websiteList = this.inputData;
        }
      });
    },
    saveListOfWebsites() {
      chrome.storage.sync.set({[this.storageName]: JSON.stringify(this.websiteList)});
    },
    cleanDomain(domain) {
      // Remove prefixes (e.g., "https://", "http://", "www.")
      const cleanedDomain = domain.replace(/^(https?:\/\/)?(www\.)?/i, '');
      // Remove anything after the end domain
      const endDomainIndex = cleanedDomain.indexOf('/');

      if (endDomainIndex !== -1) {
        return cleanedDomain.substring(0, endDomainIndex);
      }

      return cleanedDomain;
    },
    validateDomain(domain) {
      // Regular expression pattern for URL validation
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

      // Check if the URL matches the pattern
      return urlPattern.test(domain);
    },
    removeSite(siteName) {
      this.websiteList = this.websiteList.filter((site) => site.name !== siteName);
      this.saveListOfWebsites();
    },
    addWebsite() {
      this.handleBlur();
      if (this.newWebsite !== '' && !this.showInvalidErrorMessage && !this.showDuplicatedErrorMessage) {
        this.websiteList.push({name: this.cleanDomain(this.newWebsite), checked: true});
        this.saveListOfWebsites();
        this.newWebsite = '';
      }
    },
    handleBlur() {
      if (this.newWebsite === '') {
        this.showInvalidErrorMessage = false;
        this.showDuplicatedErrorMessage = false;
      } else {
        this.showInvalidErrorMessage = !this.validateDomain(this.newWebsite);
        this.showDuplicatedErrorMessage = this.websiteList.some((site) => site.name === this.cleanDomain(this.newWebsite));
      }
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
