import { english } from "./english";
import { hungarian } from "./hungarian";
import * as constants from "../constants";
import { german } from "./german";
import { romanian } from "./romanian";
import { gtcEnglish } from "./GTC/gtcEnglish";
import { gtcHungarian } from "./GTC/gtcHungarian";
import { gtcGerman } from "./GTC/gtcGerman";
import { gtcRomanian } from "./GTC/gtcRomanian";

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

export const getGtcTranslation = (language) => {
  switch (language) {
    case constants.languages.ENGLISH:
      return gtcEnglish;
    case constants.languages.HUNGARIAN:
      return gtcHungarian;
    case constants.languages.GERMAN:
      return gtcGerman;
    case constants.languages.ROMANIAN:
      return gtcRomanian;
    default:
      return gtcEnglish;
  }
};
