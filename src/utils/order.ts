export const orderAnythingByField = (list: { [key: string]: any }[], field: string, direction: 'asc' | 'desc'): any[] => {
  return list.sort((a, b) => {
    if (direction === 'asc') {
      return a[field] - b[field];
    } else {
      return b[field] - a[field];
    }
  });
}
