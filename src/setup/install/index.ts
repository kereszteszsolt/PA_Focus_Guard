import * as setup from '@/setup';
export const install = async () => {
  await setup.initialize.locales.initLocaleSettingsAndMessages();
  await setup.initialize.appData.initDefaultAppData();
  await setup.initialize.websiteRules.initDefaultWebsites();
  await setup.initialize.statistics.initDefaultStatistics();
}
