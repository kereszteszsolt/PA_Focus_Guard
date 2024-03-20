export interface IAbout {
  id: string;
  title?: string;
  text?: string;
  list?: string[];
  links?: {
    text: string;
    url: string;
  }[];
  signature?: string;
}
