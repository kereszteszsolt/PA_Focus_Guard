import { migrate } from '@/setup/migration';

function compareVersions(version1: string, version2: string): number {
  const parts1 = version1.split('.').map(Number);
  const parts2 = version2.split('.').map(Number);

  for (let i = 0; i < parts1.length; i++) {
    if (parts1[i] > parts2[i]) {
      return 1;
    } else if (parts1[i] < parts2[i]) {
      return -1;
    }
  }

  return 0;
}

export const update = async (currentVersion: string) => {
  let manifestVersion = chrome.runtime.getManifest().version;
  console.log('Current version:', currentVersion);
  console.log('Manifest version:', manifestVersion);
  if (compareVersions(currentVersion, manifestVersion) < 0) {
    console.log('Extension updated');
    await migrate();
  }
}
