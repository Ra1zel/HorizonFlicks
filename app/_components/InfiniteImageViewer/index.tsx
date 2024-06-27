"use client";

import React, { useMemo } from "react";
import { ListChildComponentProps } from "react-window";
import { CircularProgress } from "@nextui-org/react";

import VirtualizedList from "./VirtualizedList";
import ImageViewerEmptyState from "./InfiniteViewerEmptyState";

import { useGetInfiniteImageViewParams } from "@/app/_hooks/useGetInfiniteImageViewerParams";
import { useGetMovies } from "@/app/_hooks/useGetMovies";
import { FEED } from "@/types";
import { transformInto2DArray } from "@/app/_utils/utils";
import DataCard from "@/app/_components/DataCard";

interface InfiniteImageViewerProps {
  searchString: string;
  selectedFeed: FEED;
}

const InfiniteImageViewer = ({
  searchString,
  selectedFeed,
}: InfiniteImageViewerProps) => {
  const { itemSize, itemsToDisplayPerRow } = useGetInfiniteImageViewParams();

  const { movies, isEmptyList, loadMoreItems, getHasNextPage } = useGetMovies({
    searchString,
    selectedFeed,
  });

  const movies2DArray = transformInto2DArray(movies, itemsToDisplayPerRow);

  const rowRenderer = useMemo(() => {
    function Component({ index, style }: ListChildComponentProps) {
      const rowImages = movies2DArray[index];

      if (!rowImages)
        return (
          <div style={style}>
            <div className='items-center flex justify-center relative top-1/2 transform -translate-y-1/2'>
              <CircularProgress aria-label='Loading...' size='lg' />
            </div>
          </div>
        );

      return (
        <div style={style}>
          <div className='my-1 flex justify-center w-full'>
            {rowImages.map((item) => (
              <div key={`${item.id}`} className='w-full m-2 max-w-[250px]'>
                <DataCard
                  isPressable
                  backdropSrc={item.backdropSrc}
                  height={400}
                  id={item.id}
                  placeholderImage={"/movieplaceholder.png"}
                  posterSrc={item.posterSrc}
                  primaryText={item.title}
                  secondaryText={item.releaseDate}
                  width={250}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return Component;
  }, [movies, itemsToDisplayPerRow]);

  if (isEmptyList) return <ImageViewerEmptyState />;

  return (
    <VirtualizedList
      hasNextPage={getHasNextPage()}
      itemCount={movies2DArray.length}
      itemSize={itemSize}
      loadMoreItems={loadMoreItems}
      rowRenderer={rowRenderer}
    />
  );
};

export default InfiniteImageViewer;
