import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";

import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";
import { Data, Category as CategoryType } from "../utils/types";
import { signOut, getCurrentUserId } from "../utils/auth";

export default function Startpage() {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const userId = getCurrentUserId();

    firebase
      .database()
      .ref(`/users/${userId}`)
      .once("value")
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, []);

  return (
    <>
      <div className={styles.link_container}>
        {data &&
          Object.values(data.categories).map((category: CategoryType) => {
            return (
              <Category key={category.color} category={category}></Category>
            );
          })}
      </div>
      <div className={styles.bottomButtons}>
        <a className={styles.editButton}>Edit</a>
        <a className={styles.logoutButton} onClick={signOut}>
          Logout
        </a>
      </div>
    </>
  );
}
