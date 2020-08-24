import React from "react";
import Link from "./Link";

import { CategoryInterface } from "../pages/index";

import * as styles from "../styles/links.module.scss";

interface Props {
  category_links: CategoryInterface;
  category_title: string;
}

export default function Category({ category_links, category_title }: Props) {
  return (
    <div className={styles.category_container}>
      <ul className={styles.category_list}>
        <li
          style={{ color: category_links._color }}
          className={styles.category_title}
        >
          {category_title}
        </li>
        {Object.keys(category_links.links).map((key) => {
          return (
            <Link
              key={key}
              title={category_links.links[key].title}
              url={category_links.links[key].url}
            ></Link>
          );
        })}
      </ul>
    </div>
  );
}
