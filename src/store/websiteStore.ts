import { defineStore } from 'pinia';
import { IWebsite, IWebsiteList } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';

export const useWebsiteStore = defineStore({
  id: 'website',
  state: (): {
    isLoading: boolean,
    allWebsites: IWebsite[],
    websiteLists: IWebsiteList[],
  } => ({
    isLoading: true,
    allWebsites: [],
    websiteLists: []
  }),
  getters: {
    getWebsitesByListId: (state) => (listId: string) => {
      return state.allWebsites.filter((website) => website.listId === listId);
    },
    getWebsiteLists: (state) => {
      return state.websiteLists;
    },
    getWebsiteListById: (state) => (listId: string) => {
      return state.websiteLists.find((websiteList) => websiteList.id === listId);
    },
    getAllWebsites: (state) => {
      return state.allWebsites;
    }
  },
  actions: {
    async fetchWebsites(): Promise<void> {
      this.isLoading = true;
      this.allWebsites = await utils.data.fetchEntry(constants.storage.FG_WEBSITES) as IWebsite[];
      this.isLoading = false;
    },
    async fetchWebsiteLists(): Promise<void> {
      this.isLoading = true;
      this.websiteLists = await utils.data.fetchEntry(constants.storage.FG_WEBSITE_LISTS) as IWebsiteList[];
      this.isLoading = false;
    },
    async fetchData(): Promise<void> {
      await this.fetchWebsites();
      await this.fetchWebsiteLists();
      console.log(this.allWebsites);
      console.log(this.websiteLists);
    },
    async saveWebsites(): Promise<void> {
      this.isLoading = true;
      await utils.data.saveEntry(constants.storage.FG_WEBSITES, this.allWebsites);
      this.isLoading = false;
    },
    async saveWebsiteLists(): Promise<void> {
      this.isLoading = true;
      await utils.data.saveEntry(constants.storage.FG_WEBSITE_LISTS, this.websiteLists);
      this.isLoading = false;
    },
    async addWebsite(website: IWebsite): Promise<void> {
      this.allWebsites.push(website);
      await this.saveWebsites();
    },
    async addWebsiteList(websiteList: IWebsiteList): Promise<void> {
      this.websiteLists.push(websiteList);
      await this.saveWebsiteLists();
    },
    async deleteWebsite(websiteId: string): Promise<void> {
      this.allWebsites = this.allWebsites.filter(website => website.id !== websiteId);
      await this.saveWebsites();
    },
    async deleteWebsiteList(websiteListId: string): Promise<void> {
      if (this.allWebsites.some((website) => website.listId === websiteListId)) {
        throw new Error('Cannot delete a list that has websites');
      }
      this.websiteLists = this.websiteLists.filter(websiteList => websiteList.id !== websiteListId);
      await this.saveWebsiteLists();
    },
    async updateWebsite(id: string, website: IWebsite): Promise<void> {
      this.allWebsites = this.allWebsites.map((website) => {
        if (website.id === id) {
          return website;
        }
        return website;
      });
      await this.saveWebsites();
    },
    async updateWebsiteList(id: string, websiteList: IWebsiteList): Promise<void> {
      this.websiteLists = this.websiteLists.map((websiteList) => {
        if (websiteList.id === id) {
          return websiteList;
        }
        return websiteList;
      });
      await this.saveWebsiteLists();
    }
  }
});
