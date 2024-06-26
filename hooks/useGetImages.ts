"use client";
import { useEffect, useState } from "react";

import { MovieCardData } from "@/types";
import { formatMoviesCardData } from "@/utils/utils";
import { FEED } from "@/app/page";

const fetchMoviesFromSearchQuery = async (
  searchString: string,
  pageNumber: number,
) => {
  try {
    if (searchString) {
      const response = await fetch(
        `/api/searchMovies/?searchQuery=${searchString}&page=${pageNumber}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();

      return {
        movies: formatMoviesCardData(data.movies.results),
        totalPages: data.movies.total_pages,
      };
    }
  } catch (error) {
    throw new Error("An error occurred while fetching movies");
  }
};

const fetchMovieFeeds = async (selectedFeed: FEED, pageNumber: number) => {
  try {
    const response = await fetch(
      `/api/getMovies/?cat=${selectedFeed}&page=${pageNumber}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return {
      movies: formatMoviesCardData(data.movies.results),
      totalPages: data.movies.total_pages,
    };
  } catch (error) {
    throw new Error("An error occurred while fetching movies");
  }
};

export const useGetImages = ({
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

  // const [getUnsplashImages, { isLoading: isLoadingUnsplashImages }] =
  //   useLazyGetSearchImagesQuery();

  const getHasNextPage = () => {
    if (searchString) {
      return currentPage <= totalPages;
    } else {
      return currentPage <= totalPages;
    }
  };

  const getMoviesFromQuery = async (
    query: string,
    pageNumber = currentPage,
  ) => {
    setIsFetchingMovies(true);

    try {
      const data = await fetchMoviesFromSearchQuery(query, pageNumber);

      const updatedMovies: Array<MovieCardData> = [];

      if (data) {
        const { movies: newMovies, totalPages } = data;

        updatedMovies.push(...movies);
        updatedMovies.push(...newMovies);

        setMovies(updatedMovies);

        if (pageNumber === totalPages) {
          setAreAllMoviesLoaded(true);
        } else {
          setCurrentPage(pageNumber + 1);
          if (pageNumber === 1) setTotalPages(totalPages);
        }
      }
    } catch {
      setMovies([...movies]);
    } finally {
      setIsFetchingMovies(false);
    }
  };

  const getDefaultMovies = async (pageNumber = currentPage) => {
    setIsFetchingMovies(true);
    try {
      const { movies: newMovies, totalPages } = await fetchMovieFeeds(
        selectedFeed,
        pageNumber,
      );

      const updatedMovies: Array<MovieCardData> = [];

      updatedMovies.push(...movies);
      updatedMovies.push(...newMovies);

      setMovies(updatedMovies);

      if (pageNumber === totalPages) {
        setAreAllMoviesLoaded(true);
      } else {
        setCurrentPage(pageNumber + 1);
        if (pageNumber === 1) setTotalPages(totalPages);
      }
    } catch (e) {
      setMovies([...movies]);
    } finally {
      setIsFetchingMovies(false);
    }
  };

  const loadMoreItems = async () => {
    if (isFetchingMovies) return;
    if (areAllMoviesLoaded) return;

    if (searchString) {
      await getMoviesFromQuery(searchString);
    } else {
      await getDefaultMovies();
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
    if (isSearchStringChanged) {
      setIsSearchStringChanged(false);
      searchString ? getMoviesFromQuery(searchString, 1) : getDefaultMovies(1);
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
