<script>
import * as dataAccess from "../../js/utils/scripts/dataAccess";
import * as lang from "../../js/utils/languages";

export default {
  computed: {
    lang() {
      return lang;
    },
  },
  props: {
    funcTitle: {
      type: String,
      required: true,
    },
    funcName: {
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true,
    },
    justDomain: {
      type: Boolean,
      required: true,
    },
    fgLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      numberOfPages: 1,
      itemsPerPage: 10,
      currentPageItems: [],
      newUrl: "",
      showInvalidErrorMessage: false,
      showDuplicatedErrorMessage: false,
      urlDomainPattern: new RegExp(
        /^(?:https?:\/\/)?(?:www\d?\.)?([^\/\n\?:]+\.[^\/\n\?:]+)/i,
      ),
      urlLinkPattern: new RegExp(
        "^https?://www\\." + // valid prefix
          "|^http?://www\\." + // valid prefix
          "([a-zA-Z0-9_-]+\\.)+" + // valid domain
          "[a-zA-Z]{2,}" + // valid domain
          "(/[a-zA-Z0-9_-]+)*$" + // valid subdomain or route
          "|^https?://([a-zA-Z0-9_-]+\\.)+" + // valid subdomain
          "www\\." + // valid prefix
          "([a-zA-Z0-9_-]+\\.)+" + // valid domain
          "[a-zA-Z]{2,}" + // valid domain
          "(/[a-zA-Z0-9_-]+)*$", // valid route
      ),
      urlList: [],
      placeholderText: "",
    };
  },
  created() {
    this.loadFromStorage();
  },
  watch: {
    storageName: {
      immediate: true,
      handler: "loadFromStorage",
    },
  },
  methods: {
    loadFromStorage() {
      dataAccess.loadData(this.storageName).then((data) => {
        this.urlList = data;
        this.newUrl = "";
        this.calculateNumberOfPages();
        this.calculateCurrentPageItems();
        this.calculatePlaceholderText();
      });
    },
    saveToStorage() {
      dataAccess.saveData(this.storageName, this.urlList);
    },
    flipPage(direction) {
      if (direction === "next") {
        if (this.currentPage < this.numberOfPages) {
          this.currentPage++;
        }
      } else if (direction === "prev") {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
      this.calculateCurrentPageItems();
    },
    calculateNumberOfPages() {
      this.numberOfPages = Math.ceil(this.urlList.length / this.itemsPerPage);
    },
    calculateCurrentPageItems() {
      this.currentPageItems = this.urlList.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage,
      );
    },
    validateDomain(pUrl) {
      return this.justDomain
        ? this.urlDomainPattern.test(pUrl)
        : this.urlLinkPattern.test(pUrl);
    },
    truncateUrl(pUrl) {
      let result = pUrl;
      if (this.justDomain) {
        result = this.urlDomainPattern.exec(pUrl)[1];
        let segments = result.split(".");
        if (segments.length > 2) {
          result = segments.slice(-2).join(".");
        }
      }
      return result;
    },
    handleBlur(event) {
      if (this.newUrl === "") {
        this.showInvalidErrorMessage = false;
        this.showDuplicatedErrorMessage = false;
      } else {
        this.showInvalidErrorMessage = !this.validateDomain(this.newUrl);
        this.showDuplicatedErrorMessage = this.urlList.some(
          (item) => item.url === this.truncateUrl(this.newUrl),
        );
      }
    },
    addUrl() {
      if (
        this.validateDomain(this.newUrl) &&
        !this.urlList.some((item) => item.url === this.truncateUrl(this.newUrl))
      ) {
        this.urlList.push({
          url: this.truncateUrl(this.newUrl),
          isEnabled: true,
          isPermanent: false,
        });
        this.calculateNumberOfPages();
        this.calculateCurrentPageItems();
        this.newUrl = "";
        this.showInvalidErrorMessage = false;
        this.showDuplicatedErrorMessage = false;
      }
      this.saveToStorage();
    },
    removeUrl(pUrl) {
      this.urlList = this.urlList.filter((item) => item.url !== pUrl);
      this.calculateNumberOfPages();
      this.calculateCurrentPageItems();
      this.saveToStorage();
    },
    markForBlock(item) {
      if (item.isMarkedForBlock) {
        item.isMarkedForBlock = false;
        item.isPermanentlyBlocked = false;
      } else {
        item.isMarkedForBlock = true;
      }
      this.saveToStorage();
    },
    markForPermanentlyBlock(item) {
      if (item.isPermanentlyBlocked) {
        item.isPermanentlyBlocked = false;
      } else {
        item.isPermanentlyBlocked = true;
        item.isMarkedForBlock = true;
      }
      this.saveToStorage();
    },
    markAllForBlockCurrPage() {
      const allCurrPageItemsAreMarkedForBlock = this.currentPageItems.every(
        (item) => item.isMarkedForBlock,
      );
      this.currentPageItems.forEach((item) => {
        if (allCurrPageItemsAreMarkedForBlock) {
          item.isMarkedForBlock = false;
          item.isPermanentlyBlocked = false;
        } else {
          item.isMarkedForBlock = true;
        }
      });
      this.saveToStorage();
    },
    markAllForPermanentlyBlockCurrPage() {
      const allCurrPageItemsArePermanentlyBlocked = this.currentPageItems.every(
        (item) => item.isPermanentlyBlocked,
      );
      this.currentPageItems.forEach((item) => {
        if (allCurrPageItemsArePermanentlyBlocked) {
          item.isPermanentlyBlocked = false;
        } else {
          item.isPermanentlyBlocked = true;
          item.isMarkedForBlock = true;
        }
      });
      this.saveToStorage();
    },
    calculatePlaceholderText() {
      this.placeholderText = this.justDomain
        ? "example.com"
        : "https://www.example.com/something";
    },
  },
};
</script>

<template>
  <div class="title">{{ lang.getTranslation(fgLanguage, funcName) }}</div>
  <div class="urlList">
    <table>
      <thead>
        <tr>
          <th>
            {{ justDomain ? lang.getTranslation(fgLanguage, "domain") : "URL" }}
          </th>
          <th @click="markAllForBlockCurrPage(currentPageItems)">
            {{ lang.getTranslation(fgLanguage, "markedForBlock") }}
          </th>
          <th @click="markAllForPermanentlyBlockCurrPage(currentPageItems)">
            {{ lang.getTranslation(fgLanguage, "permanentlyBlocked") }}
          </th>
          <th>{{ lang.getTranslation(fgLanguage, "remove") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in currentPageItems" v-bind:key="item.url">
          <td>{{ item.url }}</td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :id="item.url"
                :checked="item.isMarkedForBlock"
                @change="markForBlock(item)"
              />
            </label>
          </td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :id="item.url"
                :checked="item.isPermanentlyBlocked"
                @change="markForPermanentlyBlock(item)"
              />
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
    <button
      @click="flipPage('prev')"
      :disabled="currentPage === 1"
      class="button-primary"
    >
      {{ lang.getTranslation(fgLanguage, "prev") }}
    </button>
    <span>{{ currentPage }} / {{ numberOfPages }}</span>
    <button
      @click="flipPage('next')"
      :disabled="currentPage === numberOfPages"
      class="button-primary"
    >
      {{ lang.getTranslation(fgLanguage, "next") }}
    </button>
  </div>
  <div class="add-url-container">
    <p>{{ lang.getTranslation(fgLanguage, "addSite") }}</p>
    <div class="input-wrapper">
      <input
        type="text"
        :placeholder="placeholderText"
        v-model="newUrl"
        @blur="handleBlur"
      />
      <button @click="addUrl" class="add-url">
        {{ lang.getTranslation(fgLanguage, "add") }}
      </button>
    </div>
    <label v-if="showInvalidErrorMessage" class="error-message">
      {{
        justDomain
          ? lang.getTranslation(fgLanguage, "invalidDomain")
          : lang.getTranslation(fgLanguage, "invalidUrl")
      }}</label
    >
    <label v-if="showDuplicatedErrorMessage" class="error-message">
      {{
        justDomain
          ? lang.getTranslation(fgLanguage, "duplicatedDomain")
          : lang.getTranslation(fgLanguage, "duplicatedUrl")
      }}</label
    >
  </div>
</template>

<style scoped lang="scss">
@import "../../scss/common.scss";
.urlList {
  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: lighten($fg-primary-color, 10%);
      color: floralwhite;
    }

    th,
    td {
      //border: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 5px;

      &:first-child {
        font-weight: bold;
        font-size: 14px;
      }

      &:nth-child(2) {
        text-align: center;
        width: 96px;
      }

      &:nth-child(3) {
        text-align: center;
        width: 96px;
      }

      &:last-child {
        text-align: center;
        width: 48px;
      }
    }

    th {
      &:nth-child(2):hover {
        cursor: pointer;
        background-color: $fg-primary-color;
      }

      &:nth-child(3):hover {
        cursor: pointer;
        background-color: $fg-primary-color;
      }

      &:last-child:hover {
        cursor: default;
        background-color: lighten($fg-primary-color, 10%);
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
    content: "";
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
