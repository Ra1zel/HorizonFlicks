"use client";
import React from "react";
import { Button as NextUIButton, ButtonProps } from "@nextui-org/react";

const Button = (props: ButtonProps) => {
  return <NextUIButton {...props} />;
};

export default Button;
