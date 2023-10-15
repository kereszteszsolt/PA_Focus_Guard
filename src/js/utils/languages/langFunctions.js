import { english } from "./english";
import { hungarian } from "./hungarian";
import * as constants from "../constants";
import { german } from "./german";
import { romanian } from "./romanian";
import { gtcEnglish } from "./GTC/gtcEnglish";
import { gtcHungarian } from "./GTC/gtcHungarian";
import { gtcGerman } from "./GTC/gtcGerman";
import { gtcRomanian } from "./GTC/gtcRomanian";
import { htuEnglish } from "./howToUse/htuEnglish";
import { htuHungarian } from "./howToUse/htuHungarian";
import { htuGerman } from "./howToUse/htuGerman";
import { htuRomanian } from "./howToUse/htuRomanian";

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

export const getHTUTranslation = (language) => {
  switch (language) {
    case constants.languages.ENGLISH:
      return htuEnglish;
    case constants.languages.HUNGARIAN:
      return htuHungarian;
    case constants.languages.GERMAN:
      return htuGerman;
    case constants.languages.ROMANIAN:
      return htuRomanian;
    default:
      return htuEnglish;
  }
};

export const getTextComponentTranslation = (component, language) => {
  switch (component) {
    case constants.componentNames.FG_GTC:
      return getGtcTranslation(language);
    case constants.componentNames.FG_HOW_TO_USE:
      return getHTUTranslation(language);
  }
};
