import React, { useState, useEffect, FormEvent } from "react";
import firebase from "gatsby-plugin-firebase";
import { v4 as uuidv4 } from "uuid";

import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";
import { Data, Category as CategoryType } from "../utils/types";
import { signOut, getCurrentUserId } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Startpage() {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);
  const [globalEditMode, setEdit] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

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

  const addCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCategory: CategoryType = {
      title: title,
      color: color,
    };
    const uid = uuidv4();

    let newData = { ...data };
    newData.categories[uid] = newCategory;
    setData(newData);
    setAddingCategory(false);
    setTitle("");
    setColor("");
  };

  const updateCategory = (categoryId: string, newCategory: CategoryType) => {
    let newData = { ...data };
    newData.categories[categoryId] = newCategory;

    setData(newData);
  };

  return (
    <>
      <div className={styles.link_container}>
        {data &&
          Object.entries(data.categories).map(([key, category]) => {
            return (
              <Category
                key={key}
                categoryId={key}
                globalEditMode={globalEditMode}
                categoryData={category}
                updateCategory={updateCategory}
              ></Category>
            );
          })}
        {globalEditMode && !addingCategory && (
          <div
            className={styles.addCategoryButton}
            onClick={() => {
              setAddingCategory(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
        {addingCategory && (
          <div className={styles.addCategoryForm}>
            <form onSubmit={addCategory}>
              <label htmlFor="titleInput">Title</label>
              <input
                id="titleInput"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
              />

              <label htmlFor="colorInput">Color</label>
              <input
                id="colorInput"
                type="text"
                placeholder="Color (HEX)"
                value={color}
                onChange={(e) => {
                  setColor(e.currentTarget.value);
                }}
              />

              <div className={styles.buttonRow}>
                <input type="submit" value="Add" />
                <button
                  onClick={() => {
                    setTitle("");
                    setColor("");
                    setAddingCategory(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
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
