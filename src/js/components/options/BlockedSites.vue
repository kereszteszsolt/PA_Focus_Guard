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
                     @change="changeSitePermission"/></td>
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
        {name: 'example.com', checked: true},
        {name: 'example2.com', checked: false},
        {name: 'example3.com', checked: true}
      ],
      active: false,
      newSiteName: ''
    };
  },
  methods: {
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
      if ((this.newSiteName !== '') && this.containsDomain(this.newSiteName)) {
        this.sites.push({name: this.removeDomainPrefixes(this.newSiteName), checked: false});
        this.newSiteName = '';
      }
    },
    removeSite(siteName) {
      this.sites = this.sites.filter(site => site.name !== siteName);
    },
    changeSitePermission(siteName) {
      this.sites = this.sites.map(site => {
        if (site.name === siteName) {
          site.checked = !site.checked;
        }

        return site;
      });
    },
  }
};
</script>
