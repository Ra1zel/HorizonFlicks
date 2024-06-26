import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  // add movie title here which is movie name
  return <div>{children}</div>;
};

export default Layout;
