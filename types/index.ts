import { SVGProps } from "react";
import { backdropSizes, imageSizes } from "@/constants";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Movie = {
  id: number;
  title: string;
  tagLine: string;
  country: string;
  posterSrc: string;
  backdropSrc: string;
  releaseDate: string;
  genre: string[];
  runtime: number;
  plotSummary: string;
  rating: number;
  inWatchlist: boolean;
  cast?: CastMember[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profileSrc: string;
};

export enum FEED {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
}

export type MovieCardData = Pick<
  Movie,
  "id" | "title" | "posterSrc" | "releaseDate" | "backdropSrc"
>;

export type PosterSize =
  | (typeof imageSizes)[keyof typeof imageSizes]
  | (typeof backdropSizes)[keyof typeof backdropSizes];
