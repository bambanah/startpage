import React from "react";

import * as styles from "../styles/links.module.scss";

interface Props {
  title: string;
  url: string;
}

export default function Link({ title, url }: Props) {
  console.log(title);
  return (
    <li>
      <a className={styles.link} href={url}>
        {title}
      </a>
    </li>
  );
}
