export interface ISocialMediaLink {
  id: number;
  platformName: string;
  mdiIcon: string;
  url: string;
  profileName: string;
  profileIdentifier: string;
  shortDescription: string;
  callToAction: string;
  contactOrder: number;
  footerOrder: number;
  list?: string[];
  image?:string;
}
