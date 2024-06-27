"use client";
import { useEffect, useState } from "react";

import { MovieCardData } from "@/types";
import { FEED } from "@/app/page";
import { fetchMoviesFromSearchQuery } from "@/app/_api/fetchMoviesFromSearchQuery";
import { fetchMovieFeeds } from "@/app/_api/fetchMovieFeed";

export const useGetMovies = ({
  searchString,
  selectedFeed,
}: {
  searchString: string;
  selectedFeed: FEED;
}) => {
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [isSearchStringChanged, setIsSearchStringChanged] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [movies, setMovies] = useState<MovieCardData[]>([]);
  const [areAllMoviesLoaded, setAreAllMoviesLoaded] = useState(false);

  const [isFetchingMovies, setIsFetchingMovies] = useState<boolean>(true);

  const getHasNextPage = () => {
    if (searchString) {
      return currentPage <= totalPages;
    } else {
      return currentPage <= totalPages;
    }
  };

  const getMovies = async (
    pageNumber = currentPage,
    dataFetcher: () => Promise<
      { movies: MovieCardData[]; totalPages: number } | undefined
    >,
  ) => {
    setIsFetchingMovies(true);

    try {
      const data = await dataFetcher();

      const updatedMovies: Array<MovieCardData> = [];

      if (data) {
        const { movies: newMovies, totalPages } = data;

        updatedMovies.push(...movies);
        updatedMovies.push(...newMovies);

        setMovies(updatedMovies);
        setTotalPages(totalPages);
        if (pageNumber === totalPages) {
          setAreAllMoviesLoaded(true);
        } else {
          setCurrentPage(pageNumber + 1);
        }
      }
    } catch {
      setMovies([...movies]);
    } finally {
      setIsFetchingMovies(false);
    }
  };

  const loadMoreItems = async () => {
    if (isFetchingMovies) return;
    if (areAllMoviesLoaded) return;

    if (searchString) {
      await getMovies(currentPage, () =>
        fetchMoviesFromSearchQuery(searchString, currentPage),
      );
    } else {
      await getMovies(currentPage, () =>
        fetchMovieFeeds(selectedFeed, currentPage),
      );
    }
  };

  useEffect(() => {
    setIsEmptyList(!!searchString && !isFetchingMovies && movies.length === 0);
  }, [isFetchingMovies, searchString, movies]);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
    setAreAllMoviesLoaded(false);
    setIsSearchStringChanged(true);
  }, [searchString]);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
    setAreAllMoviesLoaded(false);
  }, [selectedFeed]);

  useEffect(() => {
    if (isSearchStringChanged) {
      setIsSearchStringChanged(false);
      searchString
        ? getMovies(1, () => fetchMoviesFromSearchQuery(searchString, 1))
        : getMovies(1, () => fetchMovieFeeds(selectedFeed, 1));
    }
  }, [isSearchStringChanged]);

  return {
    movies,
    isEmptyList,
    isLoadingMovies: isFetchingMovies,
    loadMoreItems,
    getHasNextPage,
  };
};
