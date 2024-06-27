import prisma from "@/lib/prisma/client";
import { formatMovie } from "@/app/_utils/utils";
import { TMDB_BASE_URL } from "@/constants";

export async function getMovieById(movieId: string) {
  try {
    const response = await fetch(
      TMDB_BASE_URL +
        `/movie/${movieId}?language=en-US&page=1&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`,
    );

    const movie = await response.json();
    const watchlistMovie = await prisma.savedMovie.findUnique({
      where: {
        id: Number(movieId),
      },
    });

    return formatMovie({
      ...movie,
      inWatchlist: !!watchlistMovie,
    });
  } catch (error) {
    throw new Error("Could not fetch movie details");
  }
}
