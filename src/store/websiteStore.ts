import { defineStore } from 'pinia';
import { IWebsite, IWebsiteList } from '@/interfaces';
import * as constants from '@/constants';
import { FG_WEBSITE_LISTS } from '@/constants/localStorage';

export const websiteStore = defineStore({
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
    }
  },
  actions: {
    async fetchWebsites(): Promise<void> {
      this.isLoading = true;
      this.allWebsites = await new Promise<IWebsite[]>((resolve) => {
        chrome.storage.local.get(constants.storage.FG_WEBSITES, (result: any) => {
          resolve(JSON.parse(result.websites) || []);
        });
      });
      this.isLoading = false;
    },
    async fetchWebsiteLists(): Promise<void> {
      this.isLoading = true;
      this.websiteLists = await new Promise<IWebsiteList[]>((resolve) => {
        chrome.storage.local.get(constants.storage.FG_WEBSITES, (result: any) => {
          resolve(JSON.parse(result.websites) || []);
        });
      });
      this.isLoading = false;
    },
    async fetchData(): Promise<void> {
      await this.fetchWebsites();
      await this.fetchWebsiteLists();
    },
    async saveWebsites(): Promise<void> {
      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ 'websites': JSON.stringify(this.allWebsites)}, () => {
          resolve();
        });
      });
    },
    async saveWebsiteLists(): Promise<void> {
      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ 'websites': JSON.stringify(this.websiteLists)}, () => {
          resolve();
        });
      });
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
    },
  }
});
