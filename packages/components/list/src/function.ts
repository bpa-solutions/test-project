interface ICustomEventPayload {
  key: string;
  value: string;
}

/**
 * Update query string parameter
 * @param key Key to update
 * @param value Value to update
 */
export const updateQueryStringParameter = (key: string, value: string) => {
  if (window.history.pushState) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams.toString()}`;

    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  window.dispatchEvent(new CustomEvent<ICustomEventPayload>('locationChange', { detail: { key, value } }));
};
