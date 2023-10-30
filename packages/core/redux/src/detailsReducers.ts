/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any -- allowed */
import { ISPItem, getItemById } from '@bpa/core-services';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';

/**
 * Loading state
 */
export enum DetailsLoadingState {
  LOADED = 2,
  LOADING = 1,
  UNLOADED = 0
}

export interface IDetailsState {
  data: { id: number; item?: ISPItem; state: DetailsLoadingState }[];
}

/**
 * Empty initial chart state
 */
const detailsInitialState: IDetailsState = {
  data: []
};

enum DetailsActions {
  LOAD_DATA = 'DetailsActions.LOAD_DATA',
  SET_LOADING = 'DetailsActions.SET_LOADING'
}

export interface ILoadDataActionType {
  id: number;
}

interface ISetLoadingActionType {
  id: number;
}

interface IFetchData {
  id: number;
  listName: string;
}

interface IResponseData {
  data: ISPItem;
  id: number;
}

type DataInitiator = (params: IFetchData) => () => Promise<ISPItem>;

/**
 * Perform the query for gathering data
 * @param params query params
 * @returns Callback to perform the query
 */
const fetchDataInitiator: DataInitiator = (params) => async () => {
  if (params === null) {
    return [];
  }

  const response = await getItemById(params.listName, params.id);

  return JSON.parse(JSON.stringify(response));
};

/**
 * Set the loading state of a chart
 */
const setLoading = createAction<ISetLoadingActionType>(DetailsActions.SET_LOADING);

/**
 * Thunk for fetching data
 */
export const fetchDetails = createAsyncThunk<IResponseData, IFetchData, { rejectValue: any }>(
  'details/fetchDetails',
  async (options, thunkAPI) => {
    const { id, listName } = options;

    // Inform the store that the chart is loading
    thunkAPI.dispatch(setLoading({ id }));

    // Fetch the data
    const cleanResult = await fetchDataInitiator({ id, listName })();

    return { data: cleanResult, id };
  }
);

/**
 * Reducer for the charts
 */
export const detailsReducer = createReducer<IDetailsState>(detailsInitialState, (builder) =>
  builder
    /**
     * Indicate that the charts are loading
     */
    .addCase(setLoading, (state, action) => {
      const existingItem = state.data.findIndex((item) => item.id === action.payload.id);

      if (existingItem !== -1) {
        state.data[existingItem].item = undefined;
        state.data[existingItem].state = DetailsLoadingState.LOADING;
      } else {
        state.data.push({ id: action.payload.id, state: DetailsLoadingState.LOADING });
      }
    })
    /**
     * The thunk for fetching data has been fulfilled. Inject the data and remove the loading state
     */
    .addCase(fetchDetails.fulfilled, (state, action) => {
      const existingItem = state.data.findIndex((item) => item.id === action.payload.id);

      if (existingItem !== -1) {
        state.data[existingItem].item = action.payload.data;
        state.data[existingItem].state = DetailsLoadingState.LOADED;
      } else {
        state.data.push({ id: action.payload.id, item: action.payload.data, state: DetailsLoadingState.LOADED });
      }
    })
    /**
     * The thunk for fetching data has been rejected. Inject the error and remove the loading state
     */
    .addCase(fetchDetails.rejected, (state, action) => {
      if (action.payload) {
        const existingItem = state.data.findIndex((item) => item.id === action.payload.id);

        if (existingItem !== -1) {
          state.data[existingItem].item = undefined;
          state.data[existingItem].state = DetailsLoadingState.LOADED;
        } else {
          state.data.push({ id: action.payload.id, state: DetailsLoadingState.LOADED });
        }
      }
    })
);
