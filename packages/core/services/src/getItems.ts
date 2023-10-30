/* eslint-disable import/no-unassigned-import -- Needed for PNP */
import { sp } from '@pnp/sp';

import type { ISPItem } from './types';

import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';

/**
 * List of items for given list name
 * @param listName SP List Name
 * @returns Partial list of items
 */
export const getItems = async (listName: string): Promise<ISPItem[]> => {
  return await sp.web.lists.getByTitle(listName).items.select('Title', 'Description', 'Id')();
};

/**
 * Item details for given list name and item id
 * @param listName SP List Name
 * @param itemId SP Item ID
 * @returns Full item
 */
export const getItemById = async (listName: string, itemId: number): Promise<ISPItem> => {
  return await sp.web.lists.getByTitle(listName).items.getById(itemId).select('*')();
};
