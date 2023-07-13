<template>
  <h1>{{ title }}</h1>
  <p v-if="loading">Loading...</p>
  <div class="main-container">
    <div class="website-list">
      <table>
        <thead>
        </thead>
        <tbody>
        <tr v-for="site in currentPageItems">
          <td>
            <label class="checkbox"><input type="checkbox" :id="site.name" :checked="site.checked"
              @change="changeSitePermission(site.name)"/></label>
            </td>
          <td><label :for="site.name">{{ site.name }}</label></td>
          <td>
            <button @click="removeSite(site.name)" class="remove-site">X</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-controls">
        <button @click="flipPage(-1)" :disabled="currentPage === 1">Prev</button>
        <span>{{ currentPage }} / {{ numberOfPages }}</span>
        <button @click="flipPage(1)" :disabled="currentPage === numberOfPages">Next</button>
      </div>
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
import * as utils from '../../scripts/utils';

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    storageName: {
      type: String,
      required: true
    },
    containerComponent: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    defaultData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      websiteList: [...this.data],
      newWebsite: '',
      showInvalidErrorMessage: false,
      showDuplicatedErrorMessage: false,
      loading: false,
      currentPage: 1,
      numberOfPages: 1,
      itemsPerPage: 10,
      currentPageItems: []
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
      this.loading = true;
      utils.dataAccess.loadData(this.storageName, this.defaultData).then((data) => {
        this.websiteList = data;
        this.calculateCurrentPageItems();
        this.calculateNumberOfPages();
        this.loading = false;
      });
    },
    saveListOfWebsites() {
      this.loading = true;
      utils.dataAccess.saveData(this.storageName, this.websiteList).then(() => {
        this.calculateCurrentPageItems();
        this.calculateNumberOfPages();
        this.loading = false;
      });
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
    },
    flipPage(direction) {
      this.currentPage += direction;
      this.calculateCurrentPageItems();
    },
    calculateNumberOfPages() {
      this.numberOfPages = Math.ceil(this.websiteList.length / this.itemsPerPage);
    },
    calculateCurrentPageItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.currentPageItems = this.websiteList.slice(start, end);
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

.website-list {
  table {
    width: 100%;
    border-collapse: collapse;

    tbody {
      tr {

        td {
          padding: 8px;
          border-bottom: 1px solid #ccc;

          &:first-child {
            width: 24px;

            input[type="checkbox"] {
              appearance: none;
              width: 16px;
              height: 16px;
              border: 1px solid #ccc;
              border-radius: 2px;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:checked {
                background-color: $md-primary-color;
              }

              &:checked:before {
                content: '';
                display: block;
                width: 4px;
                height: 8px;
                border: solid #fff;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
                margin: 0 auto;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
            }

          }

          &:nth-child(2) {
            flex: 1;
            font-size: 18px;
            font-weight: bold;
            color: $md-primary-color;
          }

          &:last-child {
            width: 48px;
            text-align: center;

            button {
              background-color: $md-danger-color;
              color: #fff;
              border: none;
              padding: 8px 10px;
              border-radius: 50%;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:hover {
                background-color: darken($md-danger-color, 10%);
              }
            }
          }
        }
      }
    }
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    button {
      background-color: $md-primary-color;
      color: #fff;
      border: none;
      padding: 8px 16px;
      margin: 0 4px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken($md-primary-color, 10%);
      }

      &:disabled {
        background-color: $md-secondary-color;
        cursor: not-allowed;
      }
    }

    span {
      color: $md-primary-color;
      font-weight: bold;
      margin: 0 8px;
    }
  }
}
</style>
