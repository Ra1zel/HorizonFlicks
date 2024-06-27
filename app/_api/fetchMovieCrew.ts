import { formatCast } from "@/app/_utils/utils";
import { TMDB_BASE_URL } from "@/constants";

export async function getMovieCrew(movieId: string) {
  const response = await fetch(
    TMDB_BASE_URL +
      `/movie/${movieId}/credits?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`,
  );

  const cast = await response.json();

  return formatCast(cast.cast);
}
