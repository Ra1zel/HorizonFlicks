import React, { ReactNode } from "react";

import { getMovieById } from "@/app/_api/fetchMovieById";

interface Props {
  children: ReactNode;
}

type MetaDataProps = {
  params: { movieId: string };
};

export async function generateMetadata({ params }: MetaDataProps) {
  try {
    const { title, plotSummary, posterSrc } = await getMovieById(
      params.movieId,
    );

    return {
      title: `${title}`,
      description: `${plotSummary}`,
      openGraph: {
        title: "Horizon Flicks",
        description: "The best movie database on the internet.",
        images: [posterSrc],
      },
    };
  } catch {
    return {
      title: "Horizon Flicks",
      description: "The best movie database on the internet.",
    };
  }
}

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
