export interface IWebsiteRule {
  id: string;
  listId: string;
  url: string;
  permanentlyActive: boolean;
  temporarilyInactive: boolean;
  order: number;
  globalOrder: number;
}
