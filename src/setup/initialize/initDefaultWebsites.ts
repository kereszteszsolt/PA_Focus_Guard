import * as unique from '../../utils/unique';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { IWebsiteRule, IWebsiteRuleList } from '@/interfaces';

export const initDefaultWebsites = async () => {
  let listOfLists: IWebsiteRuleList[] = [];
  let wsRuleList_01: IWebsiteRuleList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'Whole Page',
    order: 0
  };
  listOfLists.push(wsRuleList_01);
  let wsRuleList_02: IWebsiteRuleList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'Partial Page',
    order: 1
  };
  listOfLists.push(wsRuleList_02);

await utils.data.saveList<IWebsiteRuleList>(constants.storage.FG_WEBSITE_RULE_LISTS, listOfLists);
console.log('websiteList', wsRuleList_01);

let allWebsites: IWebsiteRule[] = [];
let wsRule_01: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'facebook.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 0,
  globalOrder: 0,
};
allWebsites.push(wsRule_01);
let wsRule_02: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'twitter.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 1,
  globalOrder: 1,
};
allWebsites.push(wsRule_02);
let wsRule_03: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'youtube.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 2,
  globalOrder: 2,
};
allWebsites.push(wsRule_03);
let wsRule_04: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'reddit.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 3,
  globalOrder: 3,
};
allWebsites.push(wsRule_04);
let wsRule_05: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'instagram.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 4,
  globalOrder: 4,
};
allWebsites.push(wsRule_05);
let wsRule_06: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'linkedin.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 5,
  globalOrder: 5,
};
allWebsites.push(wsRule_06);
let wsRule_07: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'tiktok.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 6,
  globalOrder: 6,
};
allWebsites.push(wsRule_07);
let wsRule_08: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'pinterest.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 7,
  globalOrder: 7,
};
allWebsites.push(wsRule_08);
let wsRule_09: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'snapchat.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 8,
  globalOrder: 8,
};
allWebsites.push(wsRule_09);
let wsRule_10: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'whatsapp.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 9,
  globalOrder: 9,
};
allWebsites.push(wsRule_10);
let wsRule_11: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'telegram.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 10,
  globalOrder: 10,
};
allWebsites.push(wsRule_11);
let wsRule_12: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'discord.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 11,
  globalOrder: 11,
};
allWebsites.push(wsRule_12);
let wsRule_13: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'tumblr.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 12,
  globalOrder: 12,
};
allWebsites.push(wsRule_13);
let wsRule_14: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'flickr.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 13,
  globalOrder: 13,
};
allWebsites.push(wsRule_14);
let wsRule_15: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'vimeo.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 14,
  globalOrder: 14,
};
allWebsites.push(wsRule_15);
let wsRule_16: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'twitch.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 15,
  globalOrder: 15,
};
allWebsites.push(wsRule_16);
let wsRule_17: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'https://www.facebook.com/watch',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 16,
  globalOrder: 16,
};
allWebsites.push(wsRule_17);
let wsRule_18: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'https://www.instagram.com/stories',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 17,
  globalOrder: 17,
};
allWebsites.push(wsRule_18);
let wsRule_19: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'https://www.instagram.com/reel',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 18,
  globalOrder: 18,
};
allWebsites.push(wsRule_19);
let wsRule_20: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'https://www.facebook.com/stories',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 19,
  globalOrder: 19,
};
allWebsites.push(wsRule_20);
let wsRule_21: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  url: 'https://www.youtube.com/shorts',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  order: 20,
  globalOrder: 20,
};
allWebsites.push(wsRule_21);


await utils.data.saveList<IWebsiteRule>(constants.storage.FG_WEBSITE_RULES, allWebsites);
console.log('allWebsites', allWebsites);
};

