import { migrate } from '@/setup/migration';
import * as oldConstants from '@/setup/migration/oldContants';
import { install } from '@/setup/install';

export const update = async () => {
  const newVersion = chrome.runtime.getManifest().version;
  let oldVersion = '1.0.4';
  chrome.storage.local.get(oldConstants.FG_APP_DATA, async (result) => {
      if (result[oldConstants.FG_APP_DATA]) {
        let oldData = JSON.parse(result[oldConstants.FG_APP_DATA]);
        console.log('oldData', oldData);
        oldVersion = oldData.version || '1.0.4';
      }  else {
        await install();
        console.log('No old data found');
      }
      if (oldVersion === '1.0.4') {
        await migrate();
        console.log('Migration done');
      }
      if (oldVersion === '2.0.1') {
        console.log('No migration needed');
      }
    }
  );
};

