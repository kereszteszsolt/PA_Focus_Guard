import * as unique from '../unique'
import { IWebsiteList } from '@/interfaces';

export const initDefaultWebsites = () => {
  let listOfLists : IWebsiteList[] = []
  let websiteList : IWebsiteList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'DefaultList',
    order: 0
  }
}

