import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function generateMetadata() {
  return {
    title: `Horizon Flicks | Watchlist`,
    description: `Your favorite movies and TV shows. All in one place.`,
    openGraph: {
      title: "Horizon Flicks | Watchlist",
      description: "Your favorite movies and TV shows. All in one place.",
    },
  };
}

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
