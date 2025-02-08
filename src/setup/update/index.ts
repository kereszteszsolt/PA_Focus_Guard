import { migrate, upgradeVersion } from '@/setup/migration';
import * as oldConstants from '@/setup/migration/oldContants';
import { install } from '@/setup/install';

export const update = async () => {
  const newVersion = chrome.runtime.getManifest().version;
  let oldVersion = '1.0.4';
  chrome.storage.local.get(oldConstants.FG_APP_DATA, async (result) => {
      if (result[oldConstants.FG_APP_DATA]) {
        let oldData = JSON.parse(result[oldConstants.FG_APP_DATA]);
        oldVersion = oldData.version || '1.0.4';
      }  else {
        await install();
        console.log('No old data found');
      }
      if (oldVersion === '1.0.4') {
        await migrate();
        console.log('Migration done');
      }
      if (['2.0.1', '2.0.2', '2.0.3'].includes(oldVersion)) {
        console.log('Updated successfully!');
        await upgradeVersion();
      }
    }
  );
};

