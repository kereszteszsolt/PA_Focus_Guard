<template>
  <h1>{{ componentTitle }}</h1>
  <div class="distractions-container">
    <div class="distractions-list">
      <table>
        <thead>
        <tr>
          <th>Distraction</th>
          <th>Action</th>
          <th>Active Rule</th>
          <th>Permanent</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(distraction, index) in websiteElement" :key="index">
          <td>{{ distraction.name }}</td>
          <td>
            {{ distraction.actionDescription }}
          </td>
          <td>
            <input type="checkbox" v-model="distraction.activeRule" @change="saveListOfDistractions"/>
          </td>
          <td>
            <input type="checkbox" v-model="distraction.permanently" @change="saveListOfDistractions"/>
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
      newWebsite: '',
      websiteElement: [...this.defaultWebsites]
    };
  },
  created() {
    this.loadListOfDistractions();
  },
  methods: {
    loadListOfDistractions() {
      chrome.storage.sync.get(this.storageName, (result) => {
        if (result[this.storageName]) {
          JSON.parse(result[this.storageName]).forEach((storedDistraction, index) => {
            this.websiteElement.forEach((youTubeDistractionItem, index) => {
              if (youTubeDistractionItem.name === storedDistraction.name) {
                this.websiteElement[index].activeRule = storedDistraction.activeRule;
                this.websiteElement[index].permanently = storedDistraction.permanently;
              }
            });
          });
        } else {
          this.saveListOfDistractions();
        }
      });
    },
    saveListOfDistractions() {
      chrome.storage.sync.set({[this.storageName]: JSON.stringify(this.websiteElement)});
    }
  }
};
</script>

<style lang="scss">
.distractions-container {
  margin-top: 20px;
}

.distractions-list {
  > table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
}
</style>
