export interface IFaq {
  id: string;
  question: string;
  answers: string[];
  links?: {
    text: string;
    url: string;
    additionalText1?: string;
    additionalText2?: string;
  }[];
  madiIcon?: string;
}
