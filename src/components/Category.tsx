import React from "react";
import Link from "./Link";

import * as styles from "../styles/links.module.scss";

import { Category as CategoryType } from "../utils/types";
import AddLink from "./AddLink";

interface Props {
  categoryData: CategoryType;
  categoryId: string;
  globalEditMode: Boolean;
  updateCategory: any;
}

export default function Category({
  globalEditMode,
  categoryId,
  categoryData,
  updateCategory,
}: Props) {
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

  return (
    <div className={styles.category_container}>
      <ul className={styles.category_list}>
        <li
          style={{ color: categoryData.color }}
          className={styles.category_title}
        >
          {categoryData.title}
        </li>
        {categoryData.links &&
          Object.entries(categoryData.links).map(([key, link]) => {
            return (
              <Link
                key={key}
                linkId={key}
                linkTitle={link.title}
                linkUrl={link.url}
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
