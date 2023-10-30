/**
 * @packageDocumentation
 * @module Redux
 * @author Léo Maradan
 * @file Redux Store creation
 */

import { EnhancedStore, Middleware, Store, StoreEnhancer, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { IState, rootReducers } from './root';

/**
 * Generic Redux Store parameters
 */
interface ICreateStoreParameter {
  /**
   * Optional enhancers
   */
  enhancers?: StoreEnhancer[];

  /**
   * Optional middlewares
   */
  middleware?: Middleware[];

  /**
   * Initial state for the store
   */
  preloadedState?: IState;
  /**
   * a function that will apply some mutation to the state before logging
   * @param state the current state
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed
  stateSanitizer?(state: IState, index: number): any;

  /**
   * Store name, used for Redux Debug Tools
   */
  storeName: string;
}

/**
 * Type for using Redux Store outside of WebParts
 */
export type ReduxStoreType = EnhancedStore<IState>;

/**
 * Create a Redux Store
 * @param props List of parameters
 * @param props.storeName the Store name, used for Redux Debug Tools
 * @param props.stateSanitizer a callback used for sanitizing (trim) the state in redux-logger. For eg. limit an array to 20 elements
 * @param props.enhancers optional Storybook Enhancers
 * @param props.middleware optional Storybook middleware to add
 * @param props.preloadedState optional initial state for the store
 * @returns Redux Store
 */
export const createStore = <T extends IState>({
  enhancers,
  middleware: baseMiddleware,
  preloadedState,
  stateSanitizer,
  storeName
}: ICreateStoreParameter): Store<IState> => {
  // By default, the logger will display the duration of each action, and
  // Will collapse data (data will be expanded if there is an error)
  const loggerMiddleware = createLogger({
    /**
     * Method indicating if the log must be collapsed
     * @param _getState Get State function. Not used
     * @param _action Current action. Not used
     * @param logEntry Type of log
     * @returns Boolean indicating if the log must be collapsed
     */
    collapsed: (_getState: () => T, _action, logEntry): boolean => logEntry !== undefined && !logEntry.error,

    /**
     * Action filter
     * @param _getState Get State function. Not used
     * @param action Current action
     */
    diff: true,

    /**
     * Evaluate action to filter if it must be logged
     * @param _getState Redux Store State
     * @param action Action to evaluate
     * @returns Boolean indicating if the action must be logged
     */
    predicate: (_getState, action) => action.type
  });

  const middleware: Middleware[] = baseMiddleware ?? [];

  return configureStore({
    devTools: {
      name: storeName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Needed
      stateSanitizer: stateSanitizer as any,
      trace: true
    },
    enhancers: enhancers ?? [],
    /**
     * Get the middlewares by merging the default middlewares with the custom ones
     * @param getDefaultMiddleware Default middlewares
     * @returns List of middlewares
     */
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware(), ...middleware, loggerMiddleware];
    },
    /**
     * Get the middleware
     * @param getDefaultMiddleware
     * @returns
     */
    preloadedState,
    reducer: rootReducers
  });
};
