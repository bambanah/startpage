import React, { useState } from "react";
import Link from "./Link";

import * as styles from "../styles/links.module.scss";

import { Category as CategoryType } from "../utils/types";

interface Props {
  categoryData: CategoryType;
  id?: string;
  globalEditMode: Boolean;
}

export default function Category({ globalEditMode, categoryData }: Props) {
  const [category, setCategory] = useState(categoryData);

  const updateTitle = (linkId: string, value: string) => {
    let newCategory = { ...category };
    newCategory.links[linkId].title = value;

    setCategory(newCategory);
  };

  const updateUrl = (linkId: string, value: string) => {
    let newCategory = { ...category };
    newCategory.links[linkId].url = value;

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
              id={key}
              title={link.title}
              url={link.url}
              globalEditMode={globalEditMode}
              updateTitle={updateTitle}
              updateUrl={updateUrl}
            ></Link>
          );
        })}
      </ul>
    </div>
  );
}
