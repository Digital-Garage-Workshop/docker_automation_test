export const getLocalStorageItem = (props: { item: string }) => {
  const { item } = props;

  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(item);
    if (storedItem) return JSON.parse(storedItem);
  }
  return undefined;
};
