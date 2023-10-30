/**
 * Get Id from URL
 * @param key Key to get
 * @returns Id from URL or null
 */
export const getId = (key: string) => {
  const url = new URL(document.URL);
  return url.searchParams.get(key);
};
