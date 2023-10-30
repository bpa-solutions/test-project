import React from 'react';

export const Details = React.lazy(() => import(/* webpackChunkName: "Details" */ './Details'));

export type { IDetailsProps } from './Details';
