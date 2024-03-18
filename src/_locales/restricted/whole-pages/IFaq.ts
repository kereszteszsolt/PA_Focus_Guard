export interface IFaq {
  question: string;
  answers: string[];
  link?: {
    href: string;
    text: string;
  },
  madiIcon?: string;
}
