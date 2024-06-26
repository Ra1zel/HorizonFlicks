"use client";
import React, { useEffect, useRef, useState } from "react";
import DataCardSkeleton from "@/components/DataCardSkeleton";
import { ButtonGroup } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import SearchBar from "@/components/SearchBar";
import InfiniteImageViewer from "@/components/InfiniteImageViewer";

export enum FEED {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
}

export default function Home() {
  const [selectedFeed, setSelectedFeed] = useState<FEED>(FEED.NOW_PLAYING);
  const [searchQuery, setSearchQuery] = useState("");

  const myRef = useRef<HTMLBodyElement | null>(null);
  const infiniteImageViewerContainerRef = useRef<HTMLDivElement | null>(null);

  const onSearchQueryChange = (searchString: string) => {
    setSearchQuery(searchString);
  };

  // useEffect(() => {
  //   if (infiniteImageViewerContainerRef.current) {
  //     infiniteImageViewerContainerRef.current.addEventListener(
  //       "wheel",
  //       (event) => {
  //           // Check if parent can still be scrolled
  //           const parentCanScroll =
  //             myRef.current.scrollHeight >= myRef.current.clientHeight;
  //           // parentContainerRef.scrollTop + parentContainerRef. <
  //           // parentContainerRef.scrollHeight;
  //
  //           if (parentCanScroll) {
  //             console.log("parent can scroll");
  //             // Prevent child from scrolling
  //             event.preventDefault();
  //             // Scroll the parent instead
  //             myRef.current.scrollTop += event.deltaY;
  //             window.scrollTo({ top: 200, behavior: "smooth" });
  //           }
  //         }
  //
  //         console.log("scrollTop is: ", event.deltaY, myRef.current?.scrollTop);
  //       },
  //       { passive: false },
  //     );
  //   }
  // }, [infiniteImageViewerContainerRef.current]);

  return (
    <div className="h-full  border-2 border-solid border-pink-500">
      <section className=" border-solid border-2 border-red-900 flex flex-col justify-start h-full relative flex-grow md:pt-10 md:pb-5">
        <SearchBar onSearchQueryChange={onSearchQueryChange} />
        <ButtonGroup
          className="mt-4 flex flex-grow justify-center"
          radius="none"
          variant="shadow"
        >
          <div className="flex flex-auto max-w-[750px]">
            <Button
              color={selectedFeed === FEED.NOW_PLAYING ? "primary" : "default"}
              onClick={() => setSelectedFeed(FEED.NOW_PLAYING)}
            >
              Now Playing
            </Button>
            <Button
              color={selectedFeed === FEED.POPULAR ? "primary" : "default"}
              onClick={() => setSelectedFeed(FEED.POPULAR)}
            >
              Popular
            </Button>
            <Button
              color={selectedFeed === FEED.TOP_RATED ? "primary" : "default"}
              onClick={() => setSelectedFeed(FEED.TOP_RATED)}
            >
              Top Rated
            </Button>
            <Button
              color={selectedFeed === FEED.UPCOMING ? "primary" : "default"}
              onClick={() => setSelectedFeed(FEED.UPCOMING)}
            >
              Upcoming
            </Button>
          </div>
        </ButtonGroup>
      </section>
      <div
        ref={infiniteImageViewerContainerRef}
        className="h-[100vh] w-[100vw] -ml-12 p-6 border-2 border-orange-500 border-solid"
      >
        <InfiniteImageViewer
          searchString={searchQuery}
          selectedFeed={selectedFeed}
        />
      </div>
    </div>
  );
}
