import { english } from "./english";
import { hungarian } from "./hungarian";
import * as constants from "../constants";
import { german } from "./german";
import { romanian } from "./romanian";

export const getTranslation = (language, key) => {
  switch (language) {
    case constants.languages.ENGLISH:
      return english[key];
    case constants.languages.HUNGARIAN:
      return hungarian[key];
    case constants.languages.GERMAN:
      return german[key];
    case constants.languages.ROMANIAN:
      return romanian[key];
    default:
      return english[key];
  }
};
