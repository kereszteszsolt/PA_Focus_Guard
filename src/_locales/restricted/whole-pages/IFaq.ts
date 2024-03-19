export interface IFaq {
  id?: string;
  question: string;
  answers: string[];
  link?: {
    href: string;
    text: string;
  },
  madiIcon?: string;
}
