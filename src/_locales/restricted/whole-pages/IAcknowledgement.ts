export interface IAcknowledgement {
  id: string;
  title: string;
  text: string;
  links?: {
    text: string;
    url: string;
  }[];
  textAllImg?: string;
  images?: [
    {
      src: string;
      alt: string;
      description?: string;
    }
  ]
}
