import * as constants from "../utils/constants";
import { FG_AKNOWLEDGMENTS } from "../utils/constants/componentNames";

export const fgAppFunctionalities = [
  {
    funcTitle: "Block Website By Domain Name",
    funcName: constants.componentNames.FG_BLOCKED_WEBSITES_BY_DOMAIN,
    containerComponent: "BlockByUrl",
    storageName: constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN,
    justDomain: true,
  },
  {
    funcTitle: "Block Website By URL",
    funcName: constants.componentNames.FG_BLOCKED_WEBSITES_BY_URL,
    containerComponent: "BlockByUrl",
    storageName: constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL,
    justDomain: false,
  },
  {
    funcTitle: "Language",
    funcName: constants.componentNames.FG_LANGUAGE,
    containerComponent: "Language",
    storageName: "",
    justDomain: false,
  },
  {
    funcTitle: "About",
    funcName: constants.componentNames.FG_ABOUT,
    containerComponent: "About",
    storageName: "",
    justDomain: false,
  },
  {
    funcTitle: "Acknowledgments",
    funcName: constants.componentNames.FG_ACKNOWLEDGMENTS,
    containerComponent: "Acknowledgments",
    storageName: "",
    justDomain: false,
  },
  {
    funcTitle: "Gtc",
    funcName: constants.componentNames.FG_GTC,
    containerComponent: "Gtc",
    storageName: "",
    justDomain: false,
  },
];
