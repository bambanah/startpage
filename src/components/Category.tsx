import React from "react";
import Link from "./Link";

import * as styles from "../styles/links.module.scss";

import { Category as CategoryType } from "../utils/types";

interface Props {
  category: CategoryType;
}

export default function Category({ category }: Props) {
  return (
    <div className={styles.category_container}>
      <ul className={styles.category_list}>
        <li style={{ color: category.color }} className={styles.category_title}>
          {category.title}
        </li>
        {Object.values(category.links).map((link) => {
          return <Link key={link.url} title={link.title} url={link.url}></Link>;
        })}
      </ul>
    </div>
  );
}
