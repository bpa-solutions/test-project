import { Label } from '@fluentui/react';
import React, { FC } from 'react';

interface IDetailItemProps {
  readonly name: string;
  readonly value: string;
}

/**
 * Display an item for the Details component
 * @param props Parameters
 * @param props.name Item name
 * @param props.value Item value
 * @returns JSX.Element
 */
export const DetailItem: FC<IDetailItemProps> = ({ name, value }) => {
  if (typeof value === 'object') {
    return (
      <>
        <Label>{name}</Label>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </>
    );
  }

  return (
    <>
      <Label>{name}</Label>
      <span>{value}</span>
    </>
  );
};
