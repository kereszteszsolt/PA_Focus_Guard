import * as constants from "../utils/constants";
import BlockElements from "../../vue/components/BlockElements.vue";

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
    funcTitle: "Block Elements On Websites",
    funcName: constants.componentNames.FG_BLOCKED_ELEMENTS_ON_WEBSITES,
    containerComponent: "BlockElements",
    storageName: constants.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES,
    justDomain: true,
  },
];
