<script>
import * as dataAccess from "../../js/utils/scripts/dataAccess";

export default {
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
  },
  data() {
    return {
      allSites: [],
      currTabCurrPageItems: [],
      currentPage: 1,
      totalNrOfPages: 1,
      itemsPerPage: 10,

      activeFBTab: "youtube.com",
    };
  },
  watch: {
    storageName: {
      immediate: true,
      handler: "loadFromStorage",
    },
  },
  methods: {
    changeTab(fgTab) {
      this.activeFBTab = fgTab;
      this.calculateNumberOfPagesCurrTab();
      this.calculateCurrentPageItemsCurrTab();
    },
    calculateNumberOfPagesCurrTab() {
      this.totalNrOfPages = Math.ceil(
        this.allSites.filter((ws) => ws.domain === this.activeFBTab)[0]
          .elementRules.length / this.itemsPerPage,
      );
    },
    calculateCurrentPageItemsCurrTab() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.currTabCurrPageItems = this.allSites
        .filter((ws) => ws.domain === this.activeFBTab)[0]
        .elementRules.slice(startIndex, endIndex);
    },
    flipPage(direction) {
      if (direction === "prev") {
        this.currentPage--;
      } else if (direction === "next") {
        this.currentPage++;
      }
      this.calculateCurrentPageItemsCurrTab();
    },
    markForBlock(item) {
      item.isMarkedForBlock = !item.isMarkedForBlock;
      this.saveToStorage();
    },
    markForPermanentlyBlock(item) {
      item.isPermanentlyBlocked = !item.isPermanentlyBlocked;
      this.saveToStorage();
    },
    removeItem(item) {
      const index = this.allSites.elementRules.indexOf(item);
      this.allSites.elementRules.splice(index, 1);
      this.saveToStorage();
    },
    saveToStorage() {
      dataAccess.saveData(this.storageName, this.allSites);
    },
    loadFromStorage() {
      dataAccess.loadData(this.storageName).then((data) => {
        this.allSites = data;
        this.calculateNumberOfPagesCurrTab();
        this.calculateCurrentPageItemsCurrTab();
      });
    },
  },
};
</script>
<template>
  {{ storageName }}
  {{ funcName }}
  {{ funcTitle }}
  {{ justDomain }}
  <h1>{{ funcTitle }}</h1>
  <div class="tabs">
    <ul>
      <li
        v-for="ws in allSites"
        :key="ws.domain"
        :class="{ 'is-active': ws.domain === activeFBTab }"
        @click="changeTab(ws.domain)"
      >
        {{ ws.domain }}
      </li>
    </ul>
  </div>
  <div class="urlList">
    <table>
      <thead>
        <tr>
          <th>Rule Name</th>
          <th>Marked for Block</th>
          <th>Permanently Blocked</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in currTabCurrPageItems" v-bind:key="item.url">
          <td>{{ item.ruleName }}</td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :id="item.ruleName"
                :checked="item.isMarkedForBlock"
                @change="markForBlock(item)"
              />
            </label>
          </td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :id="item.ruleName"
                :checked="item.isPermanentlyBlocked"
                @change="markForPermanentlyBlock(item)"
              />
            </label>
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
      Prev
    </button>
    <span>{{ currentPage }} / {{ totalNrOfPages }}</span>
    <button
      @click="flipPage('next')"
      :disabled="currentPage === totalNrOfPages"
      class="button-primary"
    >
      Next
    </button>
  </div>
</template>
<style lang="scss">
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

      &:last-child {
        text-align: center;
        width: 96px;
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

.tabs {
  display: flex;
  justify-content: center;
  width: 100%;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 0 1px 0;
    padding: 0;
    width: 100%;

    li {
      display: flex;
      justify-content: center;
      margin-right: 1px;
      width: 100%;
      font-size: 14px;
      font-weight: bold;

      padding: 8px 16px;
      //border-radius: 8px 8px 0 0;
      clip-path: polygon(0 20%, 20% 0, 80% 0, 100% 20%, 100% 100%, 0 100%);
      background-color: lighten($fg-secondary-color, 20%);
      color: $fg-white-color;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken($fg-secondary-color, 10%);
      }

      &.is-active {
        background-color: lighten($fg-primary-color, 10%);
        color: $fg-white-color;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
