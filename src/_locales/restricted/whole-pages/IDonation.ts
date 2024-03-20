export interface IDonation {
  id: string;
  title?: string;
  text?: string;
  list?: string[];
  link?: {
    text: string;
    url: string;
  };
  mdiIcon?: string;
  image?: string;
  signature?: string;
}
