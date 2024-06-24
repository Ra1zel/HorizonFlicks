import React from "react";

import Poster from "@/components/Poster";
import {
  concatStrings,
  convertMinutesToHoursAndMinutes,
  formatCast,
  formatMovie,
  getYearFromDateString,
} from "@/utils/utils";
import Vibrant from "node-vibrant";
import UserRating from "@/components/UserRating";
import Card from "@/components/Card";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@nextui-org/skeleton";

const generateUrl = (movieId: string) =>
  `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`;

async function getMovieById(movieId: string) {
  const response = await fetch(generateUrl(movieId));

  const movie = await response.json();

  return formatMovie(movie);
}

async function getMovieCrew(movieId: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=${process.env.NEXT_PRIVATE_MOVIE_API_KEY}`,
  );

  const cast = await response.json();

  return formatCast(cast.cast);
}

export async function Page({ params }: { params: { [key: string]: string } }) {
  const movieId = params.movieId;

  //Initiate the requests in parallel
  const movieDetailsPromise = getMovieById(movieId);
  const movieCrewPromise = getMovieCrew(movieId);

  const [movieDetails, movieCrew] = await Promise.all([
    movieDetailsPromise,
    movieCrewPromise,
  ]);

  const renderMovieTitle = () => (
    <div className="flex gap-3">
      <h5 className="text-4xl font-black">{movieDetails.title}</h5>
      <span className="text-4xl text-gray-700">
        ({getYearFromDateString(movieDetails.releaseDate)})
      </span>
    </div>
  );

  const renderInfo = () => (
    <div className="flex gap-3">
      <div className="flex gap-1">
        <p>{movieDetails.releaseDate}</p>
        <p>({movieDetails.country})</p>
      </div>
      &bull;
      <p>{concatStrings(movieDetails.genre)}</p>
      &bull;
      <p>{convertMinutesToHoursAndMinutes(movieDetails.runtime)}</p>
    </div>
  );

  const renderOverview = () => (
    <div className="mt-5">
      <h5 className="text-2xl font-black">Overview</h5>
      <p>{movieDetails.plotSummary}</p>
    </div>
  );

  return (
    <div>
      <Card className="rounded-none">
        <div className="flex gap-10">
          <div>
            <Poster posterPath={movieDetails.posterSrc} />
          </div>
          <div className="pt-5">
            {renderMovieTitle()}
            {renderInfo()}
            <UserRating userRating={movieDetails.rating} />
            <p className="mt-3 text-lg italic text-gray-700">
              {movieDetails.tagLine}
            </p>
            {renderOverview()}
          </div>
        </div>
      </Card>
      <div className="my-10">
        <h3 className="text-2xl font-black">Main Cast</h3>
        <div className="flex flex-wrap gap-8 mt-5">
          {movieCrew.map(({ id, name, character, profileSrc }) => (
            <MovieCard
              key={id}
              backdropSrc={profileSrc}
              height={300}
              id={id}
              posterSrc={profileSrc}
              primaryText={name}
              secondaryText={character}
              width={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
