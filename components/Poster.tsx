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
        className="rounded-none object-contain object-top backdrop-blur-sm h-[500px]"
        classNames={{
          wrapper: "rounded-none  min-w-[335px] w-auto",
        }}
        id="movie-details-poster"
        radius="lg"
        shadow="sm"
        src={IMAGE_BASE_URL + posterPath}
      />
    </div>
  );
};

export default Poster;
