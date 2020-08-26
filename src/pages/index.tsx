import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";

import Layout from "../components/Layout";
import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";

interface Data {
  categories: {
    [id: string]: Category;
  };
}

interface Link {
  category: string;
  title: string;
  url: string;
}
export interface Category {
  title: string;
  color: string;
  id: string;
  links: Link[];
}

const IndexPage = () => {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    firebase
      .database()
      .ref("/users/lachie2")
      .once("value")
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, []);

  return (
    <Layout>
      <div className={styles.link_container}>
        {data &&
          Object.values(data.categories).map((category: Category) => {
            return (
              <Category key={category.color} category={category}></Category>
            );
          })}
      </div>
    </Layout>
  );
};

// export const query = graphql`
//   {
//     allUserLinks {
//       edges {
//         node {
//           title
//           url
//           category
//           id
//         }
//       }
//     }
//     allUserCategories {
//       edges {
//         node {
//           title
//           color
//           id
//         }
//       }
//     }
//   }
// `;

export default IndexPage;
