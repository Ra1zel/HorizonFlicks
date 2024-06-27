import { FEED } from "@/app/page";
import { formatMoviesCardData } from "@/app/_utils/utils";

export const fetchMovieFeeds = async (
  selectedFeed: FEED,
  pageNumber: number,
) => {
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
