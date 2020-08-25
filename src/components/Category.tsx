import React from "react";
import Link from "./Link";

import * as styles from "../styles/links.module.scss";

interface Link {
  category: string;
  title: string;
  url: string;
}

interface Props {
  category: {
    title: string;
    color: string;
    id: string;
    links: Link[];
  };
}

export default function Category({ category }: Props) {
  return (
    <div className={styles.category_container}>
      <ul className={styles.category_list}>
        <li style={{ color: category.color }} className={styles.category_title}>
          {category.title}
        </li>
        {category.links.map((link) => {
          return <Link key={link.url} title={link.title} url={link.url}></Link>;
        })}
      </ul>
    </div>
  );
}
