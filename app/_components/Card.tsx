"use client";
import React from "react";
import { Card as NextUiCard, CardProps } from "@nextui-org/react";

const Card = ({ ...rest }: CardProps) => {
  return <NextUiCard {...rest} />;
};

export default Card;
