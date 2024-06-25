"use client";
import React, { ReactNode } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  primaryText: string;
  secondaryText: string;
  posterSrc: string;
  backdropSrc?: string;
  width: number;
  height: number;
  isPressable?: boolean;
  primaryButton?: ReactNode;
}

const DataCard = ({
  id,
  primaryText,
  secondaryText,
  posterSrc,
  backdropSrc,
  width,
  height,
  primaryButton,
  isPressable = false,
}: Props) => {
  const router = useRouter();

  return (
    <div>
      <Card
        className={`h-[${height}px] w-[${width}px] rounded-none`}
        isPressable={isPressable}
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
          <div className="flex w-full items-center justify-between">
            <p className="text-sm text-gray-800">{secondaryText}</p>
            {primaryButton ?? null}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataCard;
