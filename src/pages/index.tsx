import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import Startpage from "../components/Startpage";

const IndexPage = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/" component={Startpage}></PrivateRoute>
      </Router>
    </Layout>
  );
};

export default IndexPage;
