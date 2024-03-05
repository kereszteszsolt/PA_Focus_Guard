export interface IWebsiteRule {
  id: string;
  listId: string;
  urlFilter: string;
  permanentlyActive: boolean;
  temporarilyInactive: boolean;
  localOrder: number;
  globalOrder: number;
  urlFilterType: string;
}
