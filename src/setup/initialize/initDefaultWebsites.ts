import * as unique from '../../utils/unique';
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

  let website3 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.notion.com',
    order: 1,
    globalOrder: 2,
  }
  allWebsites.push(website3);

  let website4 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList2.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.twitter.com',
    order: 2,
    globalOrder: 3,
  }
  allWebsites.push(website4);

  let website5 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.linkedin.com',
    order: 3,
    globalOrder: 4,
  }
  allWebsites.push(website5);

  let website6 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList2.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.instagram.com',
    order: 4,
    globalOrder: 5,
  }
  allWebsites.push(website6);

  let website7 : IWebsiteRule = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.twitter.com',
    order: 5,
    globalOrder: 6,
  }
  allWebsites.push(website7);

  await utils.data.saveList<IWebsiteRule>(constants.storage.FG_WEBSITE_RULES, allWebsites);
  console.log('allWebsites', allWebsites);
}

