export enum StorageItem {
  User = 'App/user',
  LoggedInUser = 'App/loggedInUser',
  JwtToken = 'App/jwtToken',
  Role = 'App/role',
  Key = 'App/key',
  Club = 'App/club',
  Theme = 'App/theme',
}

export const getItem = (itemName: StorageItem): unknown | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: unknown): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
