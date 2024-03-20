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
  customIcon1?: string;
  customIcon2?: string;
}
