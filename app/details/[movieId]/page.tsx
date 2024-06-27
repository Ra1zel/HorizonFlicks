import React from "react";
import { Divider } from "@nextui-org/react";

import Poster from "@/app/_components/Poster";
import {
  concatStrings,
  convertMinutesToHoursAndMinutes,
  getYearFromDateString,
} from "@/app/_utils/utils";
import UserRating from "@/app/_components/UserRating";
import Card from "@/app/_components/Card";
import DataCard from "@/app/_components/DataCard";
import AddRemoveMovieButton from "@/app/_components/AddRemoveMovieButton";
import { getMovieById } from "@/app/_api/fetchMovieById";
import { getMovieCrew } from "@/app/_api/fetchMovieCrew";

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
    <div className='flex gap-3 flex-col sm:flex-row'>
      <h5 className='text-4xl font-black'>{movieDetails.title}</h5>
      <span className='text-4xl text-gray-700 dark:text-white'>
        ({getYearFromDateString(movieDetails.releaseDate)})
      </span>
    </div>
  );

  const renderInfo = () => (
    <div className='flex gap-3 flex-col md:flex-row'>
      <Divider className='block md:hidden my-3' />
      <div className='flex gap-1'>
        <p>{movieDetails.releaseDate}</p>
        <p>({movieDetails.country})</p>
      </div>
      <span className='hidden md:block'>&bull;</span>
      <p>{concatStrings(movieDetails.genre)}</p>
      <span className='hidden md:block'>&bull;</span>
      <p>{convertMinutesToHoursAndMinutes(movieDetails.runtime)}</p>
    </div>
  );

  const renderOverview = () => (
    <div className='mt-5'>
      <h5 className='text-2xl font-black'>Overview</h5>
      <p>{movieDetails.plotSummary}</p>
    </div>
  );

  return (
    <div className='mx-auto max-w-7xl p-6'>
      <Card className='rounded-none'>
        <div className='flex flex-col gap-10 md:flex-row p-5'>
          <div className='flex justify-center'>
            <Poster posterPath={movieDetails.posterSrc} />
          </div>
          <div>
            {renderMovieTitle()}
            {renderInfo()}
            <UserRating userRating={movieDetails.rating} />
            <p className='mt-3 text-lg italic text-gray-700 dark:text-white'>
              {movieDetails.tagLine}
            </p>
            {renderOverview()}
            <AddRemoveMovieButton
              className='mt-6 rounded-none'
              movie={movieDetails}
            />
          </div>
        </div>
      </Card>
      <div className='my-10'>
        <h3 className='text-2xl font-black'>Main Cast</h3>
        <Divider />
        <div className='flex flex-wrap gap-8 mt-5 justify-center md:justify-normal'>
          {movieCrew.map(({ id, name, character, profileSrc }) => (
            <DataCard
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
