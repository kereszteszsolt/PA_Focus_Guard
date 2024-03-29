import { migrate } from '@/setup/migration';

export const update = async () => {
  await migrate();
};

