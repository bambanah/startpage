import React from "react";

import Layout from "../components/Layout";
import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";

import { graphql } from "gatsby";
import formatFirebaseData from "../utils/formatFirebaseData";

import { Category as CategoryInterface } from "../utils/formatFirebaseData";

interface Props {
  data: {
    allUserCategories: {
      edges: [];
    };
    allUserLinks: {
      edges: [];
    };
  };
}

const IndexPage = ({ data }: Props) => {
  const userCategories = formatFirebaseData(data);

  return (
    <Layout>
      <div className={styles.link_container}>
        {Object.values(userCategories).map((category: CategoryInterface) => {
          return <Category key={category.id} category={category}></Category>;
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
