export const setStorage = (storageKey: string, storageValue: unknown) => {
  localStorage.setItem(storageKey, JSON.stringify(storageValue));
};

export const getStorage = (storageKey: string) => {
  const storageValue = localStorage.getItem(storageKey);
  return JSON.parse(storageValue || '');
};
