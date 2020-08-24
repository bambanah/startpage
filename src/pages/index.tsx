import React from "react";

import Layout from "../components/Layout";
import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";

interface LinkInterface {
  title: string;
  url: string;
}

export interface CategoryInterface {
  _color: string;
  links: {
    [key: string]: LinkInterface;
  };
}

interface Links {
  [key: string]: CategoryInterface;
}

const links: Links = {
  media: {
    _color: "#8be9fd",
    links: {
      youtube: {
        title: "YouTube",
        url: "https://youtube.com/feed/subscriptions",
      },
      netflix: { title: "Netflix", url: "https://netflix.com/browse" },
    },
  },
  reddit: {
    _color: "#f1fa8c",
    links: {
      front: { title: "Reddit", url: "https://reddit.com" },
      unixporn: { title: "/r/unixporn", url: "https://reddit.com/r/unixporn" },
    },
  },
};

const IndexPage = () => {
  return (
    <Layout>
      <h1 className="title">Hello</h1>
      <div className={styles.link_container}>
        {Object.keys(links).map((category: string) => {
          return (
            <Category
              key={category}
              category_title={category}
              category_links={links[category]}
            ></Category>
          );
        })}
      </div>
    </Layout>
  );
};

export default IndexPage;
