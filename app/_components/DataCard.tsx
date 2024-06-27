"use client";
import React, { memo, ReactNode } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
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

const DataCard = memo(
  ({
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
          className={`h-[${height}px] w-[${width}px]  rounded-none`}
          isPressable={isPressable}
          shadow='sm'
          onPress={() => {
            router.push(`/details/${id}`);
          }}
        >
          <CardBody className='overflow-visible flex-none p-0'>
            <div
              className='bg-center bg-cover'
              style={{
                backgroundImage: `url(${backdropSrc})`,
              }}
            >
              <img
                alt={primaryText}
                className={`w-full rounded-none  object-contain object-top backdrop-blur-sm h-[${height - 100}px]`}
                src={posterSrc ? posterSrc : "/userAvatar.png"}
                width='100%'
              />
            </div>
          </CardBody>
          <CardFooter className='flex items-start flex-col text-small flex-auto justify-start'>
            <h3 className='text-md font-black'>{primaryText}</h3>
            <div className='flex w-full items-center justify-between'>
              <p className='text-sm dark:text-white text-gray-800'>
                {secondaryText}
              </p>
              {primaryButton ?? null}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  },
);

DataCard.displayName = "DataCard";

export default DataCard;
