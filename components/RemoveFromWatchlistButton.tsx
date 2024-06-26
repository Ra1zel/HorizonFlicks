"use client";
import React from "react";

import Button from "@/atoms/Button";
import { watchlistAction } from "@/actions/watchlist";
import { TrashOutlineIcon } from "@/styles/icons";
import { MovieCardData } from "@/types";
import { redirect } from "next/navigation";

interface Props {
  movie: MovieCardData;
}

const RemoveFromWatchlistButton = ({ movie }: Props) => {
  const handleOnButtonClick = async () => {
    try {
      await watchlistAction(
        {
          ...movie,
        },
        "/watchlist",
      );
    } catch (error) {
      throw new Error("An error occurred. Operation could not be completed.");
    }
  };

  return (
    <Button
      isIconOnly
      className="rounded-none"
      color="danger"
      size="sm"
      variant="solid"
      onClick={handleOnButtonClick}
    >
      <TrashOutlineIcon size={20} />
    </Button>
  );
};

export default RemoveFromWatchlistButton;
