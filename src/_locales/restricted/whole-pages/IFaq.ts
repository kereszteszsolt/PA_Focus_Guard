export interface IFaq {
  id: string;
  question: string;
  answers: string[];
  links?: {
    text: string;
    url: string;
    additionalText?: string;
  }[];
  madiIcon?: string;
}
