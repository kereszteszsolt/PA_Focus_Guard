import * as constants from "../utils/constants";

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
];
