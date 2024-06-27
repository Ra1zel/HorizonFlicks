"use client";
import React from "react";
import { Image } from "@nextui-org/react";

import { IMAGE_BASE_URL } from "@/constants";

interface Props {
  posterPath: string;
}

const Poster = ({ posterPath }: Props) => {
  return (
    <div>
      <Image
        alt={posterPath}
        className='rounded-none object-contain object-top backdrop-blur-sm h-full'
        classNames={{
          wrapper: "rounded-none   w-auto min-w-[200px] sm:min-w-[335px]",
        }}
        id='movie-details-poster'
        radius='lg'
        shadow='sm'
        src={IMAGE_BASE_URL + posterPath}
      />
    </div>
  );
};

export default Poster;
