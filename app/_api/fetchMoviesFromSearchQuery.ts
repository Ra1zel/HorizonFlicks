import { formatMoviesCardData } from "@/app/_utils/utils";

export const fetchMoviesFromSearchQuery = async (
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
