<template>
  <h1>{{ title }}</h1>
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
        <tr v-for="(distraction, index) in websiteElements" :key="index">
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
      websiteElements: [...this.data]
    };
  },
  watch: {
    name: {
      immediate: true,
      handler: 'loadListOfDistractions'
    }
  },
  created() {
    this.loadListOfDistractions();
  },
  methods: {
    loadListOfDistractions() {
      chrome.storage.sync.get(this.storageName, (result) => {
        if (result[this.storageName]) {
          this.websiteElements = JSON.parse(result[this.storageName]);
        } else {
          this.websiteElements = [...this.data];
        }
      });
    },
    saveListOfDistractions() {
      chrome.storage.sync.set({[this.storageName]: JSON.stringify(this.websiteElements)});
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
