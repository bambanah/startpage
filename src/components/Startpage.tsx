import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";

import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";
import { Data, Category as CategoryType } from "../utils/types";

export default function Startpage() {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);
  const currentUser = firebase.auth().currentUser;

  if (currentUser !== null) {
    console.log("Current User Email: ", currentUser.email);
  }

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
    <div className={styles.link_container}>
      {data &&
        Object.values(data.categories).map((category: CategoryType) => {
          return <Category key={category.color} category={category}></Category>;
        })}
    </div>
  );
}