import { v4 as uuidV4 } from 'uuid';
export const generateUniqueListId = (list: { id: string }[]): string => {
  let id = uuidV4();
  while (list.find((item: any) => item.id === id)) {
    id = uuidV4();
  }
  return id;
};

export const generateUniqueNumberByField = (list: { [key: string]: any }[], field: string): number => {
  let number = 0;
  while (list.find((item: any) => item[field] === number)) {
    number++;
  }
  return number;
}

export const generateUniqueUUIDByField = (list: { [key: string]: any }[], field: string): string => {
  let id = uuidV4();
  while (list.find((item: any) => item[field] === id)) {
    id = uuidV4();
  }
  return id;
}

export const generateNumberForDuplicatesByField = (list: { [key: string]: any }[], field: string, value: string): number => {
  return list.filter((item: any) => item[field].startsWith(value)).length;
}
export const checkUniqueStringOnArrayByField = (list: { [key: string]: any }[], field: string, value: string): boolean => {
  return !list.find((item: any) => item[field] === value);
}
