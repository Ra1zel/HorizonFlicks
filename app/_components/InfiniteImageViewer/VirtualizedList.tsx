"use client";

import { ComponentType, type ReactNode } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList, type ListChildComponentProps } from "react-window";

interface Props {
  loadMoreItems: () => Promise<void>;
  hasNextPage: boolean;
  itemCount: number;
  itemSize: number;
  rowRenderer: (props: ListChildComponentProps) => ReactNode;
}

const VirtualizedList = ({
  loadMoreItems,
  hasNextPage,
  itemCount,
  itemSize,
  rowRenderer,
}: Props) => {
  const isItemLoaded = (index: number) => !hasNextPage || index < itemCount;

  // @ts-ignore
  return (
    <AutoSizer>
      {({ height, width }: { height: number; width: number }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount + (hasNextPage ? 1 : 0)}
          loadMoreItems={loadMoreItems}
          threshold={5}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              ref={ref}
              height={height}
              itemCount={itemCount + (hasNextPage ? 1 : 0)}
              itemSize={itemSize}
              width={width}
              onItemsRendered={onItemsRendered}
            >
              {rowRenderer as ComponentType<ListChildComponentProps>}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;
