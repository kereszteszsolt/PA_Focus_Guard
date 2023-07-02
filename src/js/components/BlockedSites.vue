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
                     @change="site.checked ? checkSite() : uncheckSite()"/></td>
          <td><label :for="site.name">{{ site.name }}</label></td>
          <td>
            <button @click="removeSite" class="remove-site">X</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="add-site-container">
    <p>Add site:</p>
    <div class="input-wrapper">
      <input type="text" placeholder="example.com" v-model="siteInput"/>
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
      active: false
    };
  },
  methods: {
    addSite() {
      console.log('addSite');
    },
    removeSite() {
      console.log('removeSite');
    },
    showList() {
      console.log('showList');
    },
    checkSite() {
      console.log('checkSite');
    },
    uncheckSite() {
      console.log('uncheckSite');
    }
  }
};
</script>
