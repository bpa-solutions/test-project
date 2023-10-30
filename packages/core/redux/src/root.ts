import { AnyAction, CombinedState, Dispatch, ThunkDispatch, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { IDetailsState, detailsReducer } from './detailsReducers';
import { IListState, listReducer } from './listReducers';

/**
 * Common State shared by every webparts
 */
export interface IBaseState {
  details: IDetailsState;
  list: IListState;
}

/**
 * Root reducer combining every reducers
 */
export const rootReducers = combineReducers<IBaseState>({
  details: detailsReducer,
  list: listReducer
});

/**
 * Root state combining every states
 */
export type IState = CombinedState<IBaseState>;

/**
 * Custom dispatch type
 */
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<CombinedState<IState>, null, AnyAction>;

/**
 * Return the dispatch function with correct type
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed useSelector
 * @param selector a redux selector
 * @returns the selected value
 */
export const useAppSelector: TypedUseSelectorHook<IState> = (selector) => {
  return useSelector(selector);
};
