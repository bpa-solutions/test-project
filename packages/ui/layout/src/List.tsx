/* eslint-disable react/jsx-no-literals -- Allowed */
import { ListLoadingState, fetchList, useAppDispatch, useAppSelector } from '@bpa/core-redux';
import type { ISPItem } from '@bpa/core-services';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IStackProps,
  Label,
  MarqueeSelection,
  Selection,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Stack
} from '@fluentui/react';
import React, { FC, useEffect, useRef } from 'react';

const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center' };

const tokens = {
  sectionStack: {
    childrenGap: 10
  },
  spinnerStack: {
    childrenGap: 20
  }
};

export interface IListProps {
  readonly initialId?: number;
  readonly listName: string;
  readonly onItemSelect: (item: ISPItem) => void;
}

/**
 * List component
 * @param props Parameters
 * @param props.listName SP List Name
 * @param props.onItemSelect Callback when item is selected
 * @param props.initialId Initial item ID to select
 * @returns JSX.Element
 */
export const List: FC<IListProps> = ({ initialId, listName, onItemSelect }) => {
  const { data, state } = useAppSelector((s) => s.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchList({ listName }));
  }, [dispatch, listName]);

  const columns: IColumn[] = [
    {
      fieldName: 'Title',
      key: 'Title',
      maxWidth: 200,
      minWidth: 16,
      name: 'Title'
    },
    {
      fieldName: 'Description',
      key: 'Description',
      maxWidth: 200,
      minWidth: 16,
      name: 'Description'
    }
  ];

  const selection = useRef(
    new Selection({
      /**
       * Callback when items change
       */
      onItemsChanged: () => {
        if (initialId !== undefined) {
          const index = data.findIndex((i) => i.Id === initialId);
          if (index !== -1) {
            selection.current.selectToIndex(index, true);
          }
        }
      },
      /**
       * Callback when selection changes
       */
      onSelectionChanged: () => {
        const selectedItem = selection.current.getSelection();
        if (selectedItem.length > 0) {
          onItemSelect(selectedItem[0] as ISPItem);
        }
      }
      // getKey: this._getKey,
    })
  );

  useEffect(() => {
    if (initialId !== undefined) {
      const index = data.findIndex((i) => i.Id === initialId);
      if (index !== -1) {
        selection.current.selectToIndex(index, true);
      }
    }
  }, [data, initialId]);

  if (state !== ListLoadingState.LOADED) {
    return (
      <Stack {...rowProps} tokens={tokens.spinnerStack}>
        <Label>Loading</Label>
        <Spinner size={SpinnerSize.large} />
      </Stack>
    );
  }

  return (
    <MarqueeSelection selection={selection.current}>
      <DetailsList
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        columns={columns}
        enterModalSelectionOnTouch={true}
        isHeaderVisible={true}
        items={data}
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection.current}
        selectionMode={SelectionMode.single}
        selectionPreservedOnEmptyClick={true}
      />
    </MarqueeSelection>
  );
};
