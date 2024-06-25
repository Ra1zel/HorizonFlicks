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

// adult: false,
//   gender: 1,
//   id: 4732043,
//   known_for_department: 'Acting',
//   name: 'Anastasia Miller',
//   original_name: 'Anastasia Miller',
//   popularity: 0.173,
//   profile_path: null,
//   cast_id: 65,
//   character: 'Feral Human #6',
//   credit_id: '664fb122a647645f51ec1f32',
//   order: 26

export type MovieCardData = Pick<
  Movie,
  "id" | "title" | "posterSrc" | "releaseDate" | "backdropSrc"
>;

export type PosterSize =
  | (typeof imageSizes)[keyof typeof imageSizes]
  | (typeof backdropSizes)[keyof typeof backdropSizes];
