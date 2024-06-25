"use client";
import DataCard from "@/components/DataCard";
import React, { useCallback, useEffect, useState } from "react";
import DataCardSkeleton from "@/components/DataCardSkeleton";
import { ButtonGroup } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import SearchBar from "@/components/SearchBar";
import { debounce, formatMoviesCardData } from "@/utils/utils";
import { MovieCardData } from "@/types";

enum FEED {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
}

export default function Home() {
  const [movies, setMovies] = useState<MovieCardData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState<FEED>(FEED.NOW_PLAYING);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = (searchString: string) => {
    if (searchString) {
      setIsLoading(true);
      fetch(`/api/searchMovies/?searchQuery=${searchString}`, {
        method: "GET",
      }).then((res) => {
        res.json().then((data) => {
          setMovies(formatMoviesCardData(data.movies.results));
          setIsLoading(false);
        });
      });
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 500), []);

  const onSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;

    setSearchQuery(searchString);
    debouncedFetchData(searchString);
  };

  const renderPlaceholderCards = () =>
    Array.from({ length: 10 }).map((_, i) => <DataCardSkeleton key={i} />);

  useEffect(() => {
    if (!searchQuery) {
      setIsLoading(true);
      fetch(`/api/getMovies/?cat=${selectedFeed}`, { method: "GET" }).then(
        (res) => {
          res.json().then((data) => {
            setMovies(formatMoviesCardData(data.movies.results));
            setIsLoading(false);
          });
        },
      );
    }
  }, [selectedFeed, searchQuery]);

  return (
    <section className="flex flex-col justify-start h-full flex-grow md:pt-10 md:pb-5">
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
      />
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
      <div className="flex justify-center flex-wrap gap-8 mt-10  h-full p-3 ">
        {isLoading
          ? renderPlaceholderCards()
          : movies?.map(
              ({ id, title, releaseDate, posterSrc, backdropSrc }, i) => (
                <DataCard
                  key={i}
                  isPressable
                  backdropSrc={backdropSrc}
                  height={400}
                  id={id}
                  posterSrc={posterSrc}
                  primaryText={title}
                  secondaryText={releaseDate}
                  width={250}
                />
              ),
            )}
      </div>
    </section>
  );
}
