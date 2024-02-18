import * as unique from '../unique';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { IWebsiteRule, IWebsiteRuleList } from '@/interfaces';

export const initDefaultWebsites = async() => {
  let listOfLists : IWebsiteRuleList[] = []
  let websiteList : IWebsiteRuleList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'DefaultList',
    order: 0
  }
  listOfLists.push(websiteList);
  let websiteList2 : IWebsiteRuleList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'DefaultList2',
    order: 1
  }
  listOfLists.push(websiteList2);

  await utils.data.saveList<IWebsiteRuleList>(constants.storage.FG_WEBSITE_RULE_LISTS, listOfLists);
  console.log('websiteList', websiteList);

  let allWebsites : IWebsiteRule[] = [];
  let website1 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.google.com',
    order: 0,
    globalOrder: 0,
  }
  allWebsites.push(website1);

  let website2 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList2.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.youtube.com',
    order: 0,
    globalOrder: 1,
  }
  allWebsites.push(website2);

  await utils.data.saveList<IWebsiteRule>(constants.storage.FG_WEBSITE_RULES, allWebsites);
  console.log('allWebsites', allWebsites);
}

