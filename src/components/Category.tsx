import React, { useState, FormEvent } from "react";
import Link from "./Link";
import classNames from "classnames";

import * as styles from "../styles/links.module.scss";

import { Category as CategoryType } from "../utils/types";
import AddLink from "./AddLink";
import DeletePrompt from "./DeletePrompt";
import EditHover from "./EditHover";
import EditForm from "./EditForm";

interface Props {
  categoryData: CategoryType;
  categoryId: string;
  globalEditMode: Boolean;
  updateCategory: any;
  deleteCategory: any;
}

export default function Category({
  globalEditMode,
  categoryId,
  categoryData,
  updateCategory,
  deleteCategory,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  let [deletePrompt, setDeletePrompt] = useState(false);
  const [title, setTitle] = useState(categoryData.title);
  const [color, setColor] = useState(categoryData.color);

  const updateLink = (
    linkId: string,
    newLink: { title: string; url: string }
  ) => {
    let newCategory = { ...categoryData };
    if (newCategory.links != undefined) {
      newCategory.links[linkId] = newLink;
    } else {
      newCategory.links = {
        [linkId]: newLink,
      };
    }
    updateCategory(categoryId, newCategory);
  };

  const deleteLink = (linkId: string) => {
    let newCategory = { ...categoryData };
    if (newCategory.links) {
      delete newCategory.links[linkId];
    }

    updateCategory(categoryId, newCategory);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCategory = { title: title, color: color };

    updateCategory(categoryId, newCategory);
    setIsEditing(false);
  };

  return (
    <div className={styles.category_container}>
      <ul className={styles.category_list}>
        {!isEditing && (
          <li
            className={classNames(styles.category_title, {
              [styles.categoryEdit]: globalEditMode,
            })}
            style={{ color: categoryData.color }}
          >
            {/* Default: display title */}
            {!deletePrompt && (
              <span className={styles.categoryTitleSpan}>
                {categoryData.title}
              </span>
            )}

            {/* Show edit and delete buttons on hover when in edit mode */}
            {globalEditMode && !deletePrompt && (
              <EditHover
                editFunction={setIsEditing}
                deleteFunction={setDeletePrompt}
              />
            )}

            {/* Show delete prompt after clicking delete button */}
            {deletePrompt && (
              <DeletePrompt
                id={categoryId}
                deleteFunction={deleteCategory}
                closeFunction={setDeletePrompt}
              />
            )}
          </li>
        )}
        {isEditing && (
          <li key="edit-title">
            <EditForm
              id={categoryId}
              submitHandler={handleSubmit}
              values={[
                { state: title, setState: setTitle },
                { state: color, setState: setColor },
              ]}
            />
          </li>
        )}

        {categoryData.links &&
          Object.entries(categoryData.links).map(([key, link]) => {
            return (
              <Link
                key={key}
                linkId={key}
                linkData={link}
                globalEditMode={globalEditMode}
                updateLink={updateLink}
                deleteLink={deleteLink}
              ></Link>
            );
          })}

        {globalEditMode && <AddLink updateLink={updateLink} />}
      </ul>
    </div>
  );
}
