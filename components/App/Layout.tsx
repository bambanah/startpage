import React, { ReactNode } from "react";

import { Container } from "./Styles";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
