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
      <input type="text" placeholder="example.com" v-model="newSiteName"/>
      <button @click="addSite" class="add-site">Add</button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      sites: [
        {name: 'videa.hu', checked: true},
        {name: 'dailymotion.com', checked: true}
      ],
      active: false,
      newSiteName: ''
    };
  },
  created() {
    chrome.storage.sync.get('fgPermanentlyBlockedSites', (data) => {
      if (data.fgPermanentlyBlockedSites) {
        this.sites = JSON.parse(data.fgPermanentlyBlockedSites);
      }
    });
  },
  methods: {
    saveListOfSites() {
      chrome.storage.sync.set({fgPermanentlyBlockedSites: JSON.stringify(this.sites)});
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
      if ((this.newSiteName !== '')) {
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
  }
};
</script>
