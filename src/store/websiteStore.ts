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
    getWebsiteById: (state) => (id: string): IWebsite | undefined => {
      return state.allWebsites.find((website) => website.id === id);
    },
    getWebsiteLists: (state) => {
      return state.websiteLists;
    },
    getWebsiteByListId: (state) => (listId: string): IWebsite[] => {
      return state.allWebsites.filter((website) => website.listId === listId);
    },
    getWebsiteListById: (state) => (id: string): IWebsiteList | undefined => {
      return state.websiteLists.find((websiteList) => websiteList.id === id);
    },
    getAllWebsites: (state): IWebsite[] => {
      return state.allWebsites;
    },
    getNextUniqueId(): string {
      return utils.unique.generateUniqueListId(this.allWebsites);
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
      website.id = utils.unique.generateUniqueListId(this.allWebsites);
      website.order = utils.unique.generateUniqueOrderNumber(this.allWebsites.filter((w) => w.listId === website.listId));
      website.globalOrder = utils.unique.generateUniqueOrderNumber(this.allWebsites);
      this.allWebsites.push(website);
      await this.saveWebsites();
    },
    async addWebsiteList(websiteList: IWebsiteList): Promise<void> {
      websiteList.id = utils.unique.generateUniqueListId(this.websiteLists);
      websiteList.order = utils.unique.generateUniqueOrderNumber(this.websiteLists);
      this.websiteLists.push(websiteList);
      await this.saveWebsiteLists();
    },
    async deleteWebsite(websiteId: string): Promise<void> {
      const website: IWebsite | undefined = this.allWebsites.find((w) => w.id === websiteId);
      if (website) {
        this.allWebsites = this.allWebsites.filter((w) => w.id !== websiteId);

        let websiteListCrrContext: IWebsite[] = this.allWebsites.filter((w) => w.listId === website.listId);
        websiteListCrrContext.sort((a, b) => a.order - b.order);
        websiteListCrrContext = websiteListCrrContext.map((w, index) => {
          w.order = index;
          return w;
        });
        this.allWebsites = this.allWebsites.filter((w) => w.listId !== website.listId);
        this.allWebsites.push(...websiteListCrrContext);

        this.allWebsites.sort((a, b) => a.globalOrder - b.globalOrder);
        this.allWebsites = this.allWebsites.map((w, index) => {
          w.globalOrder = index;
          return w;
        });

        await this.saveWebsites();
      }
    },
    async deleteWebsitesByListId(websiteListId: string): Promise<void> {
      this.allWebsites = this.allWebsites.filter(website => website.listId !== websiteListId);

      this.allWebsites.sort((a, b) => a.globalOrder - b.globalOrder);
      this.allWebsites = this.allWebsites.map((w, index) => {
        w.globalOrder = index;
        return w;
      });

      this.websiteLists.sort((a, b) => a.order - b.order);
      this.websiteLists = this.websiteLists.map((w, index) => {
        w.order = index;
        return w;
      });
      await this.saveWebsites();
    },
    async deleteWebsiteList(websiteListId: string): Promise<void> {
      await this.deleteWebsitesByListId(websiteListId);
      this.websiteLists = this.websiteLists.filter(websiteList => websiteList.id !== websiteListId);
      await this.saveWebsiteLists();
    },
    async updateWebsite(id: string, website: IWebsite): Promise<void> {
      this.isLoading = true;
      this.allWebsites = this.allWebsites.map((w) => w.id === id ? website : w);
      await this.saveWebsites();
      this.isLoading = false;
    },
    async updateWebsiteList(id: string, websiteList: IWebsiteList): Promise<void> {
      this.isLoading = true;
      this.websiteLists = this.websiteLists.map((w) => w.id === id ? websiteList : w);
      await this.saveWebsiteLists();
    },
    async moveUpWebsiteList(id: string): Promise<void> {
      this.isLoading = true;
      const index = this.websiteLists.findIndex((w) => w.id === id);
      if (index === 0) {
        this.isLoading = false;
        return;
      }
      const temp = this.websiteLists[index];
      this.websiteLists[index] = this.websiteLists[index - 1];
      this.websiteLists[index - 1] = temp;
      await this.saveWebsiteLists();
      this.isLoading = false;
    },
    async moveDownWebsiteList(id: string): Promise<void> {
      this.isLoading = true;
      const index = this.websiteLists.findIndex((w) => w.id === id);
      if (index === this.websiteLists.length - 1) {
        this.isLoading = false;
        return;
      }
      const temp = this.websiteLists[index];
      this.websiteLists[index] = this.websiteLists[index + 1];
      this.websiteLists[index + 1] = temp;
      await this.saveWebsiteLists();
      this.isLoading = false;
    },
    async moveUpWebsite(id: string): Promise<void> {
      this.isLoading = true;
      const index = this.allWebsites.findIndex((w) => w.id === id);
      if (index === 0) {
        this.isLoading = false;
        return;
      }
      const temp = this.allWebsites[index];
      this.allWebsites[index] = this.allWebsites[index - 1];
      this.allWebsites[index - 1] = temp;
      await this.saveWebsites();
      this.isLoading = false;
    },
    async moveDownWebsite(id: string): Promise<void> {
      this.isLoading = true;
      const index = this.allWebsites.findIndex((w) => w.id === id);
      if (index === this.allWebsites.length - 1) {
        this.isLoading = false;
        return;
      }
      const temp = this.allWebsites[index];
      this.allWebsites[index] = this.allWebsites[index + 1];
      this.allWebsites[index + 1] = temp;
      await this.saveWebsites();
      this.isLoading = false;
    }
  }
});
