"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/styles/icons";
import { watchlistAction } from "@/actions/watchlist";
import { Movie } from "@/types";
import { redirect } from "next/navigation";

interface Props {
  movie: Movie;
  className?: string;
}

const AddRemoveMovieButton = ({ className, movie }: Props) => {
  const [active, setActive] = useState(movie.inWatchlist);

  const handleOnButtonClick = async () => {
    await watchlistAction({
      id: movie.id,
      title: movie.title,
      posterSrc: movie.posterSrc,
      backdropSrc: movie.backdropSrc,
      releaseDate: movie.releaseDate,
    });
    setActive((prevState) => !prevState);
  };

  const renderButtonText = () =>
    active ? "Remove from watchlist" : "Save to watchlist";

  return (
    <Button
      disableRipple
      className={className}
      color="secondary"
      startContent={
        <HeartFilledIcon
          fill={active ? "rgba(255,50,50,0.93)" : "rgba(255,255,255,0.93)"}
          size={20}
        />
      }
      variant="solid"
      onClick={handleOnButtonClick}
    >
      {renderButtonText()}
    </Button>
  );
};

export default AddRemoveMovieButton;
