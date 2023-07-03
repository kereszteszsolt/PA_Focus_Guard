<template>
  <div class="sites-container">
    <p>Sites:</p>
    <div class="sites-list">
      <table>
        <thead>
        </thead>
        <tbody>
        <tr class="site" v-for="site in sites">
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
      <input type="text" placeholder="example.com" v-model="newSiteName"  @blur="handleBlur"/>
      <button @click="addSite" class="add-site">Add</button>
    </div>
    <label v-if="showInvalidErrorMessage" class="error-message">Invalid domain</label>
    <label v-if="showDuplicatedErrorMessage" class="error-message">Duplicated domain</label>
  </div>
</template>
<script>

export default {
  data() {
    return {
      sites: [
        {name: 'youtube.com', checked: true},
        {name: 'facebook.com', checked: true},
        {name: 'linkedin.com', checked: true}
      ],
      active: false,
      newSiteName: '',
      showInvalidErrorMessage: false,
      showDuplicatedErrorMessage: false
    };
  },
  created() {
    chrome.storage.sync.get('fgBlockedSites', (data) => {
      if (data.fgBlockedSites) {
        this.sites = JSON.parse(data.fgBlockedSites);
      }
    });
  },
  methods: {
    saveListOfSites() {
      chrome.storage.sync.set({fgBlockedSites: JSON.stringify(this.sites)});
    },
    removeDomainPrefixes(str) {
      const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^/]+)/;
      const match = str.match(domainRegex);

      if (match) {
        return match[1];
      }

      return str;
    },
    containsDomain(str) {
      const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?:\/|$)/;

      return domainRegex.test(str);
    },
    addSite() {
      this.handleBlur();
      if (!this.showInvalidErrorMessage && !this.showDuplicatedErrorMessage) {
        this.sites.push({name: this.newSiteName, checked: true});
        this.newSiteName = '';
        this.saveListOfSites();
      }
    },
    removeSite(siteName) {
      this.sites = this.sites.filter(site => site.name !== siteName);
      this.saveListOfSites();
    },
    changeSitePermission(siteName) {
      this.sites = this.sites.map(site => {
        if (site.name === siteName) {
          site.checked = !site.checked;
        }
        return site;
      });
      this.saveListOfSites();
    },
    handleBlur() {
      // Show the error message if the input field is not empty and the domain is invalid
      if (this.newSiteName !== '' && !this.containsDomain(this.newSiteName)) {
        this.showInvalidErrorMessage = true;
      } else {
        this.showInvalidErrorMessage = false;
      }
      //Show the error message if the input field is not empty and the domain is duplicated
      if (this.newSiteName !== '' && this.sites.some(site => site.name === this.newSiteName)) {
        this.showDuplicatedErrorMessage = true;
      } else {
        this.showDuplicatedErrorMessage = false;
      }
    }
  }
};
</script>
