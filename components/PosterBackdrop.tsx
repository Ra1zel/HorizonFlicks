import React, { ReactNode } from "react";

interface Props {
  posterSrc: string;
  children: ReactNode[];
}

export function PosterBackdrop({ children, posterSrc }: Props) {
  return <div>{children}</div>;
}
