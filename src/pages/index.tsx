import React from "react";

import Layout from "../components/Layout";
import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";

import { graphql } from "gatsby";

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
  Media: {
    _color: "#8be9fd",
    links: {
      youtube: {
        title: "YouTube",
        url: "https://youtube.com/feed/subscriptions",
      },
      netflix: { title: "Netflix", url: "https://netflix.com/browse" },
    },
  },
  Reddit: {
    _color: "#ff5555",
    links: {
      front: { title: "Front", url: "https://reddit.com" },
      all: { title: "All", url: "https://reddit.com/r/all" },
      unixporn: { title: "/r/unixporn", url: "https://reddit.com/r/unixporn" },
      formula1: { title: "/r/formula1", url: "https://reddit.com/r/formula1" },
    },
  },
  Programming: {
    _color: "#ff79c6",
    links: {
      github: { title: "GitHub", url: "https://github.com" },
      hackerrank: { title: "HackerRank", url: "https://hackerrank.com" },
      unixporn: { title: "/r/unixporn", url: "https://reddit.com/r/unixporn" },
      formula1: { title: "/r/formula1", url: "https://reddit.com/r/formula1" },
    },
  },
};

const IndexPage = ({ data }: any) => {
  return (
    <Layout>
      {/* <pre style={{ color: "white" }}>{JSON.stringify(data, null, 4)}</pre> */}
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

export const query = graphql`
  {
    allUserLinks {
      edges {
        node {
          title
          url
          category
          id
        }
      }
    }
    allUserCategories {
      edges {
        node {
          title
          color
          id
        }
      }
    }
  }
`;

export default IndexPage;
