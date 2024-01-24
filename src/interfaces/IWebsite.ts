export interface IWebsite {
  id: string;
  listId: string;
  url: string;
  permanentlyActive: boolean;
  temporarilyInactive: boolean;
  order: number;
}

export type WebsiteType = IWebsite;
