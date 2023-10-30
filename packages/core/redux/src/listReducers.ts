/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any -- allowed */
import { ISPItem, getItems } from '@bpa/core-services';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

/**
 * Loading state
 */
export enum ListLoadingState {
  LOADED = 2,
  LOADING = 1,
  UNLOADED = 0
}

export interface IListState {
  data: ISPItem[];
  state: ListLoadingState;
}

/**
 * Empty initial chart state
 */
const listInitialState: IListState = {
  data: [],
  state: ListLoadingState.UNLOADED
};

enum ListsActions {
  LOAD_DATA = 'ListsActions.LOAD_DATA',
  SET_LOADING = 'ListsActions.SET_LOADING'
}

interface IFetchData {
  listName: string;
}

interface IResponseData {
  data: ISPItem[];
}

type DataInitiator = (params: { listName: string }) => () => Promise<ISPItem[]>;

/**
 * Perform the query for gathering data
 * @param params query params
 * @returns Callback to perform the query
 */
const fetchDataInitiator: DataInitiator = (params) => async () => {
  if (params === null) {
    return [];
  }

  const response = await getItems(params.listName);

  return JSON.parse(JSON.stringify(response));
};

/**
 * Set the loading state of a chart
 */
const setLoading = createAction(ListsActions.SET_LOADING);

/**
 * Thunk for fetching data
 */
export const fetchList = createAsyncThunk<IResponseData, IFetchData, { rejectValue: any }>('list/fetchList', async (options, thunkAPI) => {
  const { listName } = options;

  // Inform the store that the chart is loading
  thunkAPI.dispatch(setLoading());

  // Fetch the data
  const cleanResult = await fetchDataInitiator({ listName })();

  return { data: cleanResult };
});

/**
 * Reducer for the charts
 */
export const listReducer = createReducer<IListState>(listInitialState, (builder) =>
  builder
    /**
     * Indicate that the charts are loading
     */
    .addCase(setLoading, (state) => {
      state.data = [];
      state.state = ListLoadingState.LOADING;
    })
    /**
     * The thunk for fetching data has been fulfilled. Inject the data and remove the loading state
     */
    .addCase(fetchList.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.state = ListLoadingState.LOADED;
    })
    /**
     * The thunk for fetching data has been rejected. Inject the error and remove the loading state
     */
    .addCase(fetchList.rejected, (state, action) => {
      if (action.payload) {
        state.data = [];
        state.state = ListLoadingState.LOADED;
      }
    })
);
