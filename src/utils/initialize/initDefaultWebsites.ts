import * as unique from '../unique';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { IWebsite, IWebsiteList } from '@/interfaces';

export const initDefaultWebsites = async() => {
  let listOfLists : IWebsiteList[] = []
  let websiteList : IWebsiteList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'DefaultList',
    order: 0
  }
  listOfLists.push(websiteList);
  let websiteList2 : IWebsiteList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'DefaultList2',
    order: 0
  }
  listOfLists.push(websiteList2);

  await utils.data.saveList<IWebsiteList>(constants.storage.FG_WEBSITE_LISTS, listOfLists);
  console.log('websiteList', websiteList);

  let allWebsites : IWebsite[] = [];
  let website1 : IWebsite = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.google.com',
    order: 0,
    globalOrder: 0,
  }
  allWebsites.push(website1);

  let website2 : IWebsite = {
    id: unique.generateUniqueListId(allWebsites),
    listId: websiteList2.id,
    permanentlyActive: false,
    temporarilyInactive: false,
    url: 'https://www.youtube.com',
    order: 0,
    globalOrder: 1,
  }
  allWebsites.push(website2);

  await utils.data.saveList<IWebsite>(constants.storage.FG_WEBSITES, allWebsites);
  console.log('allWebsites', allWebsites);
}

