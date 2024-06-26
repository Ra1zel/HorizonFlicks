"use client";
import React, { useRef, useState } from "react";
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

  const infiniteImageViewerContainerRef = useRef<HTMLDivElement | null>(null);

  const onSearchQueryChange = (searchString: string) => {
    setSearchQuery(searchString);
  };
  //TODO: react query ?
  //TODO: use .prettierrcJSON
  return (
    <div className="h-full no-scrollbar">
      <section className="flex flex-col  justify-start h-full relative flex-grow px-3 md:pt-10 md:pb-5">
        <SearchBar onSearchQueryChange={onSearchQueryChange} />
        {/*
        TODO: Make this is a drop down on small screens.
        */}
        <ButtonGroup
          className="mt-4 flex flex-grow justify-center"
          radius="none"
          variant="shadow"
        >
          {/*TODO: This should be rendered using a loop*/}
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
      {/*TODO use tailwind custom utility classes*/}
      <div
        ref={infiniteImageViewerContainerRef}
        className="h-screen p-6 no-scrollbar"
      >
        <InfiniteImageViewer
          searchString={searchQuery}
          selectedFeed={selectedFeed}
        />
      </div>
    </div>
  );
}
