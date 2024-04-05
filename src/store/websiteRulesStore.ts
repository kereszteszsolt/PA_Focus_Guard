import { defineStore } from 'pinia';
import { IWebsiteRule, IWebsiteRuleList } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';

export const useWebsiteRulesStore = defineStore({
  id: 'website',
  state: (): {
    isLoading: boolean,
    allWebsiteRules: IWebsiteRule[],
    websiteRuleLists: IWebsiteRuleList[],
  } => ({
    isLoading: true,
    allWebsiteRules: [],
    websiteRuleLists: []
  }),
  getters: {
    getWebsiteRuleById: (state) => (id: string): IWebsiteRule | undefined => {
      return state.allWebsiteRules.find((website) => website.id === id);
    },
    getWebsiteRuleLists: (state) => {
      return utils.order.orderAnythingByField(state.websiteRuleLists, 'order', 'asc');
    },
    getWebsiteRulesByListId: (state) => (listId: string): IWebsiteRule[] => {
      return state.allWebsiteRules.filter((website) => website.listId === listId);
    },
    getWebsiteRuleListById: (state) => (id: string): IWebsiteRuleList | undefined => {
      return state.websiteRuleLists.find((websiteList) => websiteList.id === id);
    },
    getAllWebsiteRules: (state): IWebsiteRule[] => {
      return state.allWebsiteRules;
    },
    getDummyWebsiteRule: (): IWebsiteRule => {
      return {
        id: '',
        listId: '',
        urlFilter: '',
        permanentlyActive: false,
        temporarilyInactive: false,
        localOrder: -1,
        globalOrder: -1,
        urlFilterType: constants.wsrFilter.URL
      };
    },
    getDummyWebsiteRuleList: (): IWebsiteRuleList => {
      return {
        id: '',
        name: '',
        order: -1
      };
    }
  },
  actions: {
    async fetchWebsiteRules(): Promise<void> {
      this.isLoading = true;
      this.allWebsiteRules = await utils.data.fetchEntry(constants.storage.FG_WEBSITE_RULES) as IWebsiteRule[];
      this.isLoading = false;
    },
    async fetchWebsiteRuleLists(): Promise<void> {
      this.isLoading = true;
      this.websiteRuleLists = await utils.data.fetchEntry(constants.storage.FG_WEBSITE_RULE_LISTS) as IWebsiteRuleList[];
      this.isLoading = false;
    },
    async fetchData(): Promise<void> {
      await this.fetchWebsiteRules();
      await this.fetchWebsiteRuleLists();
    },
    async saveWebsiteRules(): Promise<void> {
      this.isLoading = true;
      await utils.data.saveEntry(constants.storage.FG_WEBSITE_RULES, this.allWebsiteRules);
      this.isLoading = false;
    },
    async saveWebsiteRuleLists(): Promise<void> {
      this.isLoading = true;
      await utils.data.saveEntry(constants.storage.FG_WEBSITE_RULE_LISTS, this.websiteRuleLists);
      this.isLoading = false;
    },
    async addWebsiteRule(website: IWebsiteRule): Promise<void> {
      website.id = utils.unique.generateUniqueListId(this.allWebsiteRules);
      website.localOrder = utils.unique.generateUniqueNumberByField(this.allWebsiteRules.filter((w) => w.listId === website.listId), 'localOrder');
      website.globalOrder = utils.unique.generateUniqueNumberByField(this.allWebsiteRules, 'globalOrder');
      this.allWebsiteRules.push(website);
      await this.saveWebsiteRules();
    },
    async addWebsiteRuleList(websiteList: IWebsiteRuleList): Promise<void> {
      websiteList.id = utils.unique.generateUniqueListId(this.websiteRuleLists);
      websiteList.order = utils.unique.generateUniqueNumberByField(this.websiteRuleLists, 'order');
      this.websiteRuleLists.push(websiteList);
      await this.saveWebsiteRuleLists();
    },
    async deleteWebsiteRule(websiteId: string): Promise<void> {
      const website: IWebsiteRule | undefined = this.allWebsiteRules.find((w) => w.id === websiteId);
      if (website) {
        this.allWebsiteRules = this.allWebsiteRules.filter((w) => w.id !== websiteId);

        let websiteListCrrContext: IWebsiteRule[] = this.allWebsiteRules.filter((w) => w.listId === website.listId);
        websiteListCrrContext.sort((a, b) => a.localOrder - b.localOrder);
        websiteListCrrContext = websiteListCrrContext.map((w, index) => {
          w.localOrder = index;
          return w;
        });
        this.allWebsiteRules = this.allWebsiteRules.filter((w) => w.listId !== website.listId);
        this.allWebsiteRules.push(...websiteListCrrContext);

        this.allWebsiteRules.sort((a, b) => a.globalOrder - b.globalOrder);
        this.allWebsiteRules = this.allWebsiteRules.map((w, index) => {
          w.globalOrder = index;
          return w;
        });

        await this.saveWebsiteRules();
      }
    },
    async deleteWebsiteRulesByListId(websiteListId: string): Promise<void> {
      this.allWebsiteRules = this.allWebsiteRules.filter(website => website.listId !== websiteListId);

      this.allWebsiteRules.sort((a, b) => a.globalOrder - b.globalOrder);
      this.allWebsiteRules = this.allWebsiteRules.map((w, index) => {
        w.globalOrder = index;
        return w;
      });

      await this.saveWebsiteRules();
    },
    async deleteWebsiteRuleList(websiteListId: string): Promise<void> {
      await this.deleteWebsiteRulesByListId(websiteListId);
      this.websiteRuleLists = this.websiteRuleLists.filter(websiteList => websiteList.id !== websiteListId);

      this.websiteRuleLists.sort((a, b) => a.order - b.order);
      this.websiteRuleLists = this.websiteRuleLists.map((w, index) => {
        w.order = index;
        return w;
      });

      await this.saveWebsiteRuleLists();
    },
    async updateWebsiteRule(id: string, website: IWebsiteRule): Promise<void> {
      this.allWebsiteRules = this.allWebsiteRules.map((w) => w.id === id ? website : w);
      await this.saveWebsiteRules();
    },
    async updateWebsiteRuleList(websiteList: IWebsiteRuleList): Promise<void> {
      this.websiteRuleLists = this.websiteRuleLists.map((w) => w.id === websiteList.id ? websiteList : w);
      await this.saveWebsiteRuleLists();
    },
    _moveItem(list: any[], id: string, direction: 'up' | 'down', field: string): any[] {
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
    async moveUpWebsiteRuleList(id: string): Promise<void> {
      this.websiteRuleLists = this._moveItem(this.websiteRuleLists, id, 'up', 'order');
      await this.saveWebsiteRuleLists();
    },
    async moveDownWebsiteRuleList(id: string): Promise<void> {
      this.websiteRuleLists = this._moveItem(this.websiteRuleLists, id, 'down', 'order');
      await this.saveWebsiteRuleLists();
    },
    _moveWebsiteRule(id: string, direction: 'up' | 'down'): void {
      const item = this.allWebsiteRules.find((item) => item.id === id);
      if (!item) return;
      const list = this.allWebsiteRules.filter((w) => w.listId === item.listId);
      const editedList = this._moveItem(list, id, direction, 'localOrder');
      this.allWebsiteRules = this.allWebsiteRules.filter((w) => w.listId !== item.listId);
      this.allWebsiteRules.push(...editedList);
    },
    async moveUpWebsiteRule(id: string): Promise<void> {
      this._moveWebsiteRule(id, 'up');
      await this.saveWebsiteRules();
    },
    async moveDownWebsiteRule(id: string): Promise<void> {
      this._moveWebsiteRule(id, 'down');
      await this.saveWebsiteRules();
    },
    async moveUpWebsiteRulesGlobalOrder(id: string): Promise<void> {
      this.allWebsiteRules = this._moveItem(this.allWebsiteRules, id, 'up', 'globalOrder');
      await this.saveWebsiteRules();
    },
    async moveDownWebsiteRulesGlobalOrder(id: string): Promise<void> {
      this.allWebsiteRules = this._moveItem(this.allWebsiteRules, id, 'down', 'globalOrder');
      await this.saveWebsiteRules();
    }
  }
});
