import React from 'react';

export const List = React.lazy(() => import(/* webpackChunkName: "List" */ './List'));

export type { IListProps } from './List';
