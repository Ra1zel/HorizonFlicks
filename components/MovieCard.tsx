"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { MovieCardData } from "@/types";

interface Props {
  // movie: MovieCardData;
  id: number;
  primaryText: string;
  secondaryText: string;
  posterSrc: string;
  backdropSrc?: string;
  width: number;
  height: number;
}

const MovieCard = ({
  id,
  primaryText,
  secondaryText,
  posterSrc,
  backdropSrc,
  width,
  height,
}: Props) => {
  const router = useRouter();

  return (
    <div>
      <Card
        isPressable
        className={`h-[${height}px] w-[${width}px] rounded-none`}
        shadow="sm"
        onPress={() => {
          router.push(`/details/${id}`);
        }}
      >
        <CardBody className="overflow-visible flex-none p-0">
          <div
            style={{
              backgroundImage: `url(${backdropSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <Image
              alt={primaryText}
              className={`w-full rounded-none  object-contain object-top backdrop-blur-sm h-[${height - 100}px]`}
              classNames={{
                wrapper: "rounded-none",
              }}
              radius="lg"
              shadow="sm"
              src={posterSrc ? posterSrc : "/userAvatar.png"}
              width="100%"
            />
          </div>
        </CardBody>
        <CardFooter className="flex items-start flex-col text-small flex-auto justify-start">
          <h3 className="text-lg">{primaryText}</h3>
          <p className="text-sm text-gray-800">{secondaryText}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieCard;
