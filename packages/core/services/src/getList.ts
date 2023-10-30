import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import type { WebPartContext } from '@microsoft/sp-webpart-base';

import type { ISPLists } from './types';

/**
 * Get Lists
 * @param context WebPartContext
 * @returns List of lists
 */
export const getListData = (context: WebPartContext): Promise<ISPLists[]> => {
  return context.spHttpClient
    .get(`${context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    })
    .catch(() => {});
};
