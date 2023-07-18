<script>
export default {
  props: {
    funcTitle: {
      type: String,
      required: true
    },
    funcName: {
      type: String,
      required: true
    },
    storageName: {
      type: String,
      required: true
    },
    justDomain: {
      type: Boolean,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      numberOfPages: 1,
      itemsPerPage: 10,
      currentPageItems: [],
      newUrl: '',
      showInvalidErrorMessage: false,
      showDuplicatedErrorMessage: false,
      urlDomainPattern: new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)'),
      urlLinkPattern: new RegExp('^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$'),
      urlList: [...this.data]
    };
  },
  created() {
    this.calculateNumberOfPages();
    this.calculateCurrentPageItems();
  },
  methods: {
    flipPage: function (direction) {
      if (direction === 'next') {
        if (this.currentPage < this.numberOfPages) {
          this.currentPage++;
        }
      } else if (direction === 'prev') {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
      this.calculateCurrentPageItems();
    },
    calculateNumberOfPages: function () {
      this.numberOfPages = Math.ceil(this.urlList.length / this.itemsPerPage);
    },
    calculateCurrentPageItems: function () {
      this.currentPageItems = this.urlList.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    },
    validateDomain: function (pUrl) {
      return this.justDomain ?  this.urlDomainPattern.test(pUrl) : this.urlLinkPattern.test(pUrl);
    },
    truncateUrl: function (pUrl) {
      return this.justDomain ? this.urlDomainPattern.exec(pUrl)[1] : pUrl;
    },
    handleBlur: function (event) {
      if (this.newUrl === '') {
        this.showInvalidErrorMessage = false;
        this.showDuplicatedErrorMessage = false;
      } else {
        this.showInvalidErrorMessage = !this.validateDomain(this.newUrl);
        this.showDuplicatedErrorMessage = this.urlList.some(item => item.url === this.truncateUrl(this.newUrl));
      }
    },
    addUrl: function () {
      if (this.validateDomain(this.newUrl) && !this.urlList.some(item => item.url === this.truncateUrl(this.newUrl))) {
        this.urlList.push({
          url: this.truncateUrl(this.newUrl),
          isEnabled: true,
          isPermanent: false
        });
        this.calculateNumberOfPages();
        this.calculateCurrentPageItems();
        this.newUrl = '';
        this.showInvalidErrorMessage = false;
        this.showDuplicatedErrorMessage = false;
      }
    },
    removeUrl: function (pUrl) {
      this.urlList = this.urlList.filter(item => item.url !== pUrl);
      this.calculateNumberOfPages();
      this.calculateCurrentPageItems();
    }
  }
};
</script>

<template>
  {{ funcName }} <br/>
  {{ funcTitle }} <br/>
  {{ storageName }} <br/>
  <div class="urlList">
    <table>
      <thead>
      <tr>
        <th>URL</th>
        <th>Enabled</th>
        <th>Permanent</th>
        <th>Remove</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in currentPageItems" v-bind:key="item.url">
        <td>{{ item.url }}</td>
        <td>
          <label class="checkbox">
            <input type="checkbox" :id="item.url" :checked="item.isEnabled"/>
          </label>
        </td>
        <td>
          <label class="checkbox">
            <input type="checkbox" :id="item.url" :checked="item.isPermanent"/>
          </label>
        </td>
        <td>
          <button @click="removeUrl(item.url)">X</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination-controls">
    <button @click="flipPage('prev')" :disabled="currentPage === 1" class="button-primary">Prev</button>
    <span>{{ currentPage }} / {{ numberOfPages }}</span>
    <button @click="flipPage('next')" :disabled="currentPage === numberOfPages" class="button-primary">Next</button>
  </div>
  <div class="add-url-container">
    <p>Add site:</p>
    <div class="input-wrapper">
      <input type="text" placeholder="example.com" v-model="newUrl" @blur="handleBlur"/>
      <button @click="addUrl" class="add-url">Add</button>
    </div>
    <label v-if="showInvalidErrorMessage" class="error-message">Invalid domain</label>
    <label v-if="showDuplicatedErrorMessage" class="error-message">Duplicated domain</label>
  </div>
</template>

<style scoped lang="scss">
@import '../../scss/common.scss';

.urlList {
  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: lighten($fg-primary-color, 10%);
      color: floralwhite;
    }

    th, td {
      //border: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 5px;

      &:first-child {
        font-weight: bold;
        font-size: 14px;
        width: 100%;
      }

      &:nth-child(2) {
        text-align: center;
        width: 24px;
      }

      &:nth-child(3) {
        text-align: center;
        width: 24px;
      }

      &:last-child {
        text-align: center;
        width: 48px;
      }
    }
  }
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

  &:hover {
    border-color: darken(#ccc, 10%);
  }

  &:checked {
    background-color: $fg-primary-color;
  }

  &:checked:hover {
    background-color: darken($fg-primary-color, 10%);
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

button {
  background-color: $fg-danger-color;
  color: floralwhite;
  font-weight: bolder;
  border: none;
  padding: 8px 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($fg-danger-color, 10%);
  }
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: lighten($fg-primary-color, 10%);
    color: $fg-white-color;
    border: none;
    padding: 8px 16px;
    margin: 0 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $fg-primary-color;
    }

    &:disabled {
      background-color: lighten($fg-secondary-color, 20%);
      color: $fg-secondary-color;
      cursor: not-allowed;
    }
  }

  span {
    color: $fg-primary-color;
    font-weight: bold;
    margin: 0 8px;
  }
}

.add-url-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  > p {
    font-size: 14px;
    font-weight: 500;
    margin: 8px 0 8px 0;
    color: $fg-primary-color;
  }

  & .input-wrapper {
    display: flex;
    flex-direction: row;

    > input {
      flex: 1;
      padding: 8px;
      margin-right: 8px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background-color: lighten($fg-secondary-color, 20%);
      color: $fg-white-color;
      transition: background-color 0.3s ease;

      &:focus {
        outline: none;
        background-color: $fg-secondary-color;
      }
    }


    > button {
      width: 100px;
      padding: 8px 16px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      background-color: $fg-success-color;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken($fg-success-color, 10%);
      }
    }

  }
}
</style>