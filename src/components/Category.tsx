import React, { useState } from "react";
import Link from "./Link";

import * as styles from "../styles/links.module.scss";

import { Category as CategoryType } from "../utils/types";
import AddLink from "./AddLink";

interface Props {
  categoryData: CategoryType;
  id?: string;
  globalEditMode: Boolean;
}

export default function Category({ globalEditMode, categoryData }: Props) {
  const [category, setCategory] = useState(categoryData);

  const updateLink = (
    linkId: string,
    newLink: { title: string; url: string }
  ) => {
    let newCategory = { ...category };

    newCategory.links[linkId] = newLink;

    setCategory(newCategory);
  };

  const deleteLink = (linkId: string) => {
    let newCategory = { ...category };
    delete newCategory.links[linkId];

    setCategory(newCategory);
  };

  return (
    <div className={styles.category_container}>
      <ul className={styles.category_list}>
        <li style={{ color: category.color }} className={styles.category_title}>
          {category.title}
        </li>
        {Object.entries(category.links).map(([key, link]) => {
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
