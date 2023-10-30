/* eslint-disable react/jsx-no-literals -- Test */
import type { ISPItem } from '@bpa/core-services';
import { List as UIList } from '@bpa/ui-layouts';
import { Stack, Text } from '@fluentui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { updateQueryStringParameter } from './function';

export interface IListProps {
  readonly listName: string;
}

/**
 * List component
 * @param props Params
 * @param props.listName List name to display
 * @returns JSX.Element
 */
const List: FC<IListProps> = ({ listName }) => {
  const [id, setId] = useState<number>();

  const onItemSelect = useCallback((item: ISPItem) => {
    updateQueryStringParameter('BPAID', item.Id.toString());
  }, []);

  useEffect(() => {
    const url = new URL(document.URL);
    const isBpaIdUrlInitial = url.searchParams.get('BPAID');
    setId(isBpaIdUrlInitial ? parseInt(isBpaIdUrlInitial, 10) : undefined);
  }, []);

  if (!listName) {
    return <Text>Please set a list name</Text>;
  }

  return (
    <Stack>
      <Text variant="xLarge">List items</Text>
      <UIList initialId={id} listName={listName} onItemSelect={onItemSelect as any} />
    </Stack>
  );
};

export default List;
