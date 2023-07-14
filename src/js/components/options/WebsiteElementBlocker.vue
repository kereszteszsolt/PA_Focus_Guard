<template>
  <h1>{{ title }}</h1>
  <div class="main-container">
    <div class="distractions-list">
      <table>
        <thead>
        <tr>
          <th>Distraction</th>
          <th>Search Terms</th>
          <th>Active Rule</th>
          <th>Permanent</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(distraction, index) in websiteElements" :key="index">
          <td>{{ distraction.name }}</td>
          <td>
            {{ distraction.searchTerms }}
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

// Define Material Design color variables
$md-primary-color: #574513;
//greenish brown
$md-secondary-color: #7f8c8d;
$md-danger-color: #e74c3c;
$md-success-color: #2ecc71;
$md-warning-color: #f1c40f;

.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.distractions-list {
  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        th {
          padding: 8px;
          border-bottom: 1px solid #ccc;
          text-align: left;

          &:first-child {

          }

          &:nth-child(2) {

          }

          &:nth-child(3) {
            width: 100px;
          }

          &:nth-child(4) {
            width: 100px;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 8px;
          border-bottom: 1px solid #ccc;

          &:first-child {
            font-size: 18px;
            font-weight: bold;
            color: $md-primary-color;
          }

          &:nth-child(2) {
            font-size: 16px;
          }

          &:nth-child(3) {
            width: 100px;
          }

          &:nth-child(4) {
            width: 100px;
          }

          input[type="checkbox"] {
            appearance: none;
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            border-radius: 2px;
            cursor: pointer;
            margin: 2px auto -2px auto;
            transition: background-color 0.3s ease;

            &:checked {
              background-color: $md-primary-color;
            }

            &:checked:hover {
              background-color: darken($md-primary-color, 10%);
            }

            &:checked:before {
              content: '';
              display: block;
              width: 4px;
              height: 8px;
              border: solid #fff;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
              margin: 3px auto -3px auto;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
          }


        }
      }
    }
  }
}
</style>
