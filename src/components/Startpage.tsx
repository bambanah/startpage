import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";

import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";
import { Data, Category as CategoryType } from "../utils/types";

export default function Startpage() {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const userId = firebase.auth().currentUser?.uid;

    firebase
      .database()
      .ref(`/users/${userId}`)
      .once("value")
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, []);

  return (
    <div className={styles.link_container}>
      {data &&
        Object.values(data.categories).map((category: CategoryType) => {
          return <Category key={category.color} category={category}></Category>;
        })}
    </div>
  );
}
