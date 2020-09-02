import React, { ReactNode } from "react";

import "./layout.css";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="container">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
