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

let allWebsites: IWebsiteRule[] = [];
let wsRule_01: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'facebook.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: true,
  localOrder: 0,
  globalOrder: 0,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_01);
let wsRule_02: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'twitter.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 1,
  globalOrder: 1,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_02);
let wsRule_03: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'youtube.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 2,
  globalOrder: 2,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_03);
let wsRule_04: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'reddit.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 3,
  globalOrder: 3,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_04);
let wsRule_05: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'instagram.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 4,
  globalOrder: 4,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_05);
let wsRule_06: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'linkedin.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 5,
  globalOrder: 5,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_06);
let wsRule_07: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'tiktok.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 6,
  globalOrder: 6,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_07);
let wsRule_08: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'pinterest.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 7,
  globalOrder: 7,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_08);
let wsRule_09: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'snapchat.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 8,
  globalOrder: 8,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_09);
let wsRule_10: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'whatsapp.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 9,
  globalOrder: 9,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_10);
let wsRule_11: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'telegram.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 10,
  globalOrder: 10,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_11);
let wsRule_12: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'discord.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 11,
  globalOrder: 11,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_12);
let wsRule_13: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'tumblr.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 12,
  globalOrder: 12,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_13);
let wsRule_14: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'flickr.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 13,
  globalOrder: 13,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_14);
let wsRule_15: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'vimeo.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 14,
  globalOrder: 14,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_15);
let wsRule_16: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'twitch.com',
  listId: wsRuleList_01.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 15,
  globalOrder: 15,
  urlFilterType: constants.wsrFilter.DOMAIN
};
allWebsites.push(wsRule_16);
let wsRule_17: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'https://www.facebook.com/watch',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: true,
  localOrder: 16,
  globalOrder: 16,
  urlFilterType: constants.wsrFilter.URL
};
allWebsites.push(wsRule_17);
let wsRule_18: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'https://www.instagram.com/stories',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 17,
  globalOrder: 17,
  urlFilterType: constants.wsrFilter.URL
};
allWebsites.push(wsRule_18);
let wsRule_19: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'https://www.instagram.com/reel',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 18,
  globalOrder: 18,
  urlFilterType: constants.wsrFilter.URL
};
allWebsites.push(wsRule_19);
let wsRule_20: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'https://www.facebook.com/stories',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: true,
  localOrder: 19,
  globalOrder: 19,
  urlFilterType: constants.wsrFilter.URL
};
allWebsites.push(wsRule_20);
let wsRule_21: IWebsiteRule = {
  id: unique.generateUniqueListId(allWebsites),
  urlFilter: 'https://www.youtube.com/shorts',
  listId: wsRuleList_02.id,
  permanentlyActive: false,
  temporarilyInactive: false,
  localOrder: 20,
  globalOrder: 20,
  urlFilterType: constants.wsrFilter.URL
};
allWebsites.push(wsRule_21);


await utils.data.saveList<IWebsiteRule>(constants.storage.FG_WEBSITE_RULES, allWebsites);
};

