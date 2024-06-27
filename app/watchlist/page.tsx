import React from "react";
import { Divider } from "@nextui-org/react";

import prisma from "@/lib/prisma/client";
import DataCard from "@/app/_components/DataCard";
import RemoveFromWatchlistButton from "@/app/_components/RemoveFromWatchlistButton";

export async function fetchWatchlistMovies() {
  return prisma.savedMovie.findMany();
}

export default async function Page() {
  const watchlistMovies = await fetchWatchlistMovies();

  return (
    <div className='mx-auto max-w-7xl px-6'>
      <h3 className='text-4xl text-black'>Your Watchlist</h3>
      <Divider />
      <div className='flex flex-wrap justify-center lg:justify-normal py-5 gap-10'>
        {watchlistMovies.length !== 0 ? (
          watchlistMovies.map((movie) => (
            <DataCard
              key={movie.id}
              backdropSrc={movie.backdropSrc}
              height={400}
              id={movie.id}
              posterSrc={movie.posterSrc}
              primaryButton={<RemoveFromWatchlistButton movie={movie} />}
              primaryText={movie.title}
              secondaryText={movie.releaseDate}
              width={250}
            />
          ))
        ) : (
          <div className='flex w-full mt-12 justify-center  text-2xl dark:text-white text-gray-700'>
            Your watch list is empty
          </div>
        )}
      </div>
    </div>
  );
}
