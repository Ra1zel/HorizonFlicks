"use client";
import React, { useState } from "react";
import { ButtonGroup } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";

import SearchBar from "@/app/_components/SearchBar";

const InfiniteImageViewer = dynamic(
  () => import("@/app/_components/InfiniteImageViewer"),
  { ssr: false },
);

export default function Home() {
  const [selectedFeed, setSelectedFeed] = useState<FEED>(FEED.NOW_PLAYING);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchQueryChange = (searchString: string) => {
    setSearchQuery(searchString);
  };

  const renderFeedButtons = () => (
    <ButtonGroup
      className='flex mt-4 flex-grow justify-center'
      radius='none'
      variant='shadow'
    >
      <div className='flex flex-auto max-w-[750px]'>
        {feedButtonsConfig.map(({ text, buttonType }, index) => (
          <Button
            key={index}
            color={selectedFeed === buttonType ? "primary" : "default"}
            onClick={() => setSelectedFeed(buttonType)}
          >
            {text}
          </Button>
        ))}
      </div>
    </ButtonGroup>
  );

  return (
    <div className='h-full no-scrollbar'>
      <section className='flex flex-col  justify-start relative flex-grow px-3 md:pt-10 md:pb-5'>
        <SearchBar onSearchQueryChange={onSearchQueryChange} />
        {!searchQuery ? renderFeedButtons() : null}
      </section>
      <div className='h-screen p-6 pb-2 no-scrollbar'>
        <InfiniteImageViewer
          searchString={searchQuery}
          selectedFeed={selectedFeed}
        />
      </div>
    </div>
  );
}

export enum FEED {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
}

const feedButtonsConfig = [
  {
    buttonType: FEED.NOW_PLAYING,
    text: "Now Playing",
  },
  {
    buttonType: FEED.POPULAR,
    text: "Popular",
  },
  {
    buttonType: FEED.TOP_RATED,
    text: "Top Rated",
  },
  {
    buttonType: FEED.UPCOMING,
    text: "Upcoming",
  },
];
