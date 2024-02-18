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
      return utils.order.orderAnythingByField(state.websiteLists, 'order', 'asc');
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
      website.order = utils.unique.generateUniqueNumberByField(this.allWebsites.filter((w) => w.listId === website.listId), 'order');
      website.globalOrder = utils.unique.generateUniqueNumberByField(this.allWebsites, 'globalOrder');
      this.allWebsites.push(website);
      await this.saveWebsites();
    },
    async addWebsiteList(websiteList: IWebsiteList): Promise<void> {
      websiteList.id = utils.unique.generateUniqueListId(this.websiteLists);
      websiteList.order = utils.unique.generateUniqueNumberByField(this.websiteLists, 'order');
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

      await this.saveWebsites();
    },
    async deleteWebsiteList(websiteListId: string): Promise<void> {
      await this.deleteWebsitesByListId(websiteListId);
      this.websiteLists = this.websiteLists.filter(websiteList => websiteList.id !== websiteListId);

      this.websiteLists.sort((a, b) => a.order - b.order);
      this.websiteLists = this.websiteLists.map((w, index) => {
        w.order = index;
        return w;
      });

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
    _moveItem(list: any[], id: string, direction: 'up' | 'down', field: string): any[] {
      console.log('list', list);
      const item = list.find((item) => item.id === id);
      if (!item) return list;

      const value = item[field];
      const nextValue = direction === 'up' ? value - 1 : value + 1;
      if (nextValue < 0 || nextValue >= list.length) return list;

      const nextItem = list.find((item) => item[field] === nextValue);
      if (!nextItem) return list;

      item[field] = nextValue;
      nextItem[field] = value;

      return list;
    },
    async moveUpWebsiteList(id: string): Promise<void> {
      this.websiteLists = this._moveItem(this.websiteLists, id, 'up', 'order');
      await this.saveWebsites();
    },
    async moveDownWebsiteList(id: string): Promise<void> {
      this.websiteLists = this._moveItem(this.websiteLists, id, 'down', 'order');
      await this.saveWebsites();
    },
    _moveWebsite(id: string, direction: 'up' | 'down'): void {
      const item = this.allWebsites.find((item) => item.id === id);
      if (!item) return;
      const list = this.allWebsites.filter((w) => w.listId === item.listId);
      const editedList = this._moveItem(list, id, direction, 'order');
      this.allWebsites = this.allWebsites.filter((w) => w.listId !== item.listId);
      this.allWebsites.push(...editedList);
    },
    async moveUpWebsite(id: string): Promise<void> {
      this._moveWebsite(id, 'up');
      await this.saveWebsites();
    },
    async moveDownWebsite(id: string): Promise<void> {
      this._moveWebsite(id, 'down');
      await this.saveWebsites();
    },
    async moveUpWebsiteGlobalOrder(id: string): Promise<void> {
      this.allWebsites = this._moveItem(this.allWebsites, id, 'up', 'globalOrder');
      await this.saveWebsites();
    },
    async moveDownWebsiteGlobalOrder(id: string): Promise<void> {
      this.allWebsites = this._moveItem(this.allWebsites, id, 'down', 'globalOrder');
      await this.saveWebsites();
    }
  }
});
