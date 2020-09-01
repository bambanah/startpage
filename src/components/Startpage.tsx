import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";

import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";
import { Data } from "../utils/types";
import { signOut, getCurrentUserId } from "../utils/auth";

export default function Startpage() {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);
  const [globalEditMode, setEdit] = useState(false);

  useEffect(() => {
    const userId = getCurrentUserId();

    firebase
      .database()
      .ref(`/users/${userId}`)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.key);
        setData(snapshot.val());
      });
  }, []);

  const updateLinks = (links: Data) => {
    const userId = getCurrentUserId();

    firebase
      .database()
      .ref(`/users/${userId}`)
      .once("value")
      .then((snapshot) => {
        if (JSON.stringify(links) != JSON.stringify(snapshot.val())) {
          console.log("Firebase updated.");
          firebase.database().ref(`/users/${userId}`).set(links);
        }
      });
  };

  return (
    <>
      <div className={styles.link_container}>
        {data &&
          Object.entries(data.categories).map(([key, category]) => {
            return (
              <Category
                key={category.color}
                id={key}
                globalEditMode={globalEditMode}
                categoryData={category}
              ></Category>
            );
          })}
      </div>
      <div className={styles.bottomButtons}>
        {!globalEditMode && (
          <a className={styles.editButton} onClick={() => setEdit(true)}>
            Edit
          </a>
        )}
        {globalEditMode && (
          <a
            style={{ border: `1px solid #43d4ee` }}
            className={styles.editButton}
            onClick={() => {
              setEdit(false);
              updateLinks(data);
            }}
          >
            Save
          </a>
        )}
        <a className={styles.logoutButton} onClick={signOut}>
          Logout
        </a>
      </div>
    </>
  );
}
