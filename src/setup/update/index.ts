import { migrate, upgradeVersion } from '@/setup/migration';
import * as oldConstants from '@/setup/migration/oldContants';
import { install } from '@/setup/install';

export const update = async () => {
  let oldVersion = '1.0.4';
  chrome.storage.local.get(oldConstants.FG_APP_DATA, async (result) => {
      if (result[oldConstants.FG_APP_DATA]) {
        const oldData = JSON.parse(result[oldConstants.FG_APP_DATA]);
        oldVersion = oldData.version || '1.0.4';
      }  else {
        await install();
        console.log('No old data found');
      }
      if (oldVersion === '1.0.4') {
        await migrate();
        console.log('Migration done');
      }
      if (['2.0.1', '2.0.2', '2.0.3', '2.0.4', '2.0.5'].includes(oldVersion)) {
        console.log('Updated successfully!');
        await upgradeVersion();
      }
    }
  );
};

