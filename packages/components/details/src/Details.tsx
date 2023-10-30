/* eslint-disable react/jsx-no-literals -- Test */
import { Details as UIDetails } from '@bpa/ui-layouts';
import { Stack, Text } from '@fluentui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';

export interface IDetailsProps {
  readonly listName: string;
}

interface ICustomEventPayload {
  key: string;
  ref?: string;
  value: string;
}

/**
 * Details component
 * @param props Params
 * @param props.listName List name to display
 * @returns JSX.Element
 */
const Details: FC<IDetailsProps> = ({ listName }) => {
  const [id, setId] = useState<number>();

  const locationChangeChangeHandler = useCallback(
    (event: CustomEvent<ICustomEventPayload>) => {
      if (event.detail.key === 'BPAID' && event.detail.value !== String(id)) {
        setId(Number.parseInt(event.detail.value, 10));
      }
    },
    [id]
  );

  useEffect(() => {
    const url = new URL(document.URL);
    const isBpaIdUrlInitial = url.searchParams.get('BPAID');

    if (isBpaIdUrlInitial) {
      const newId = parseInt(isBpaIdUrlInitial, 10);
      if (newId !== id) {
        setId(parseInt(isBpaIdUrlInitial as string, 10));
      }
    }

    window.addEventListener('locationChange', locationChangeChangeHandler as (e: Event) => void);
    return () => {
      window.removeEventListener('locationChange', locationChangeChangeHandler as (e: Event) => void);
    };
  }, [id, locationChangeChangeHandler]);

  if (!listName) {
    return <Text>Please set a list name</Text>;
  }

  if (!id) {
    return <Text>Please select an item</Text>;
  }

  return (
    <Stack>
      <Text variant="xLarge">Details of items</Text>
      <UIDetails id={id} listName={listName} />
    </Stack>
  );
};

export default Details;
