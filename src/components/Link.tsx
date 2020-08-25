import React from "react";

import * as styles from "../styles/links.module.scss";

interface Props {
  title: string;
  url: string;
}

export default function Link({ title, url }: Props) {
  return (
    <li className={styles.link}>
      <a href={url}>{title}</a>
    </li>
  );
}
