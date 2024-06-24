import { format, parseISO } from "date-fns";
import { CastMember, Movie, MovieCardData, PosterSize } from "@/types";
import {
  BACK_DROP_BASE_URL,
  backdropSizes,
  IMAGE_BASE_URL,
  imageSizes,
} from "@/constants";

/**
 * Formats a given date string into the format "MMM dd, yyyy".
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDateString(dateString: string): string {
  const date = parseISO(dateString);

  return format(date, "MMM dd, yyyy");
}

/**
 * Debounce a function.
 *
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: number;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function generateCompleteImageUrl(
  baseUrl: string,
  slug: string,
  size: PosterSize,
) {
  if (slug) return baseUrl + size + slug;

  return "";
}

export function formatMoviesCardData(MoviesResponse: any[]): MovieCardData[] {
  return MoviesResponse.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: formatDateString(movie.release_date),
      backdropSrc: generateCompleteImageUrl(
        BACK_DROP_BASE_URL,
        movie.backdrop_path,
        backdropSizes.thumbnail,
      ),
      posterSrc: generateCompleteImageUrl(
        IMAGE_BASE_URL,
        movie.poster_path,
        imageSizes.thumbnail,
      ),
    };
  });
}

export function formatMovie(movie: any): Movie {
  return {
    id: movie.id,
    title: movie.title,
    tagLine: movie.tagline,
    releaseDate: movie.release_date,
    backdropSrc: generateCompleteImageUrl(
      BACK_DROP_BASE_URL,
      movie.backdrop_path,
      backdropSizes.medium,
    ),
    posterSrc: generateCompleteImageUrl(
      IMAGE_BASE_URL,
      movie.poster_path,
      imageSizes.medium,
    ),
    genre: movie.genres.map((genre: any) => genre.name),
    runtime: movie.runtime,
    plotSummary: movie.overview,
    rating: movie.vote_average,
    country: movie.origin_country,
  };
}

export function formatCast(cast: any): CastMember[] {
  return cast.map((member: any) => {
    return {
      id: member.id,
      name: member.name,
      character: member.character,
      profileSrc: generateCompleteImageUrl(
        IMAGE_BASE_URL,
        member.profile_path,
        imageSizes.thumbnail,
      ),
    };
  });
}

export function getYearFromDateString(dateString: string) {
  const date = new Date(dateString);

  return date.getFullYear();
}

export function concatStrings(stringList: string[]): string {
  return stringList.join(", ");
}
export function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} min${remainingMinutes !== 1 ? "s" : ""}`;
}
