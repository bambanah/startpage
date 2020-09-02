import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/App/Layout";
import PrivateRoute from "../components/App/PrivateRoute";
import Startpage from "../components/Startpage/Startpage";

import "../styles/global.scss";

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
