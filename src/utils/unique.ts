import { v4 as uuidV4 } from 'uuid';
export const generateUniqueListId = (list: { id: string }[]): string => {
  let id = uuidV4();
  while (list.find((item: any) => item.id === id)) {
    id = uuidV4();
  }
  return id;
};

export const generateUniqueOrderNumber = (list: { order: number }[]): number => {
  let order = 0;
  while (list.find((item: any) => item.order === order)) {
    order++;
  }
  return order;
};
