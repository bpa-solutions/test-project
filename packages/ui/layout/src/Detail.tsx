/* eslint-disable react/jsx-no-literals -- Allowed */
import { DetailsLoadingState, fetchDetails, useAppDispatch, useAppSelector } from '@bpa/core-redux';
import type { ISPItem } from '@bpa/core-services';
import { IStackProps, Label, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import React, { FC, useEffect } from 'react';

import { DetailItem } from './DetailItem';

const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

const tokens = {
  sectionStack: {
    childrenGap: 10
  },
  spinnerStack: {
    childrenGap: 20
  }
};

export interface IDetailsProps {
  readonly id: number;
  readonly listName: string;
}

/**
 * Display the details of an item
 * @param props Parameters
 * @param props.id Item ID
 * @param props.listName SP List Name
 * @returns JSX.Element
 */
export const Details: FC<IDetailsProps> = ({ id, listName }) => {
  const data = useAppSelector((state) => state.details.data.find((d) => d.id === id));
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchDetails({ id, listName }));
  }, [dispatch, id, listName]);

  if (!data || !data.item || data.state !== DetailsLoadingState.LOADED) {
    return (
      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Loading</Label>
        <Spinner size={SpinnerSize.large} />
      </Stack>
    );
  }

  return (
    <Stack {...tokens.sectionStack}>
      {Object.keys(data.item).map((itemName) => (
        <DetailItem name={itemName} key={itemName} value={(data.item as ISPItem)[itemName as keyof ISPItem] as string} />
      ))}
    </Stack>
  );
};
