import React from "react";
import { useRouter } from "next/router";

import Layout from "../components/App/Layout";
import Startpage from "../components/Startpage/Startpage";
import { useAuth } from "../components/context/AuthContext";

// import "../styles/global.scss";

const IndexPage = () => {
  const { authenticated, loadingAuthState } = useAuth();

  const router = useRouter();

  if (loadingAuthState) {
    return <div>Loading...</div>;
  }

  if (!authenticated && !loadingAuthState) {
    router.push("/login");
  }

  return (
    <Layout>
      <Startpage />
    </Layout>
  );
};

export default IndexPage;
