import React, { useState } from "react";

import * as styles from "../styles/links.module.scss";

interface EditLinkProps {
  id: string;
  title: string;
  url: string;
  updateTitle: any;
  updateUrl: any;
}

const EditLink = ({
  id,
  title,
  url,
  updateTitle,
  updateUrl,
}: EditLinkProps) => {
  return (
    <li>
      <input
        id={`${id}-title`}
        value={title}
        onChange={(e) => updateTitle(id, e.currentTarget.value)}
      />
      <input
        id={`${id}-url`}
        value={url}
        onChange={(e) => updateUrl(id, e.currentTarget.value)}
      />
    </li>
  );
};

interface LinkProps {
  id: string;
  title: string;
  url: string;
  updateTitle: any;
  updateUrl: any;
  globalEditMode: Boolean;
}

export default function Link({
  id,
  title,
  url,
  updateTitle,
  updateUrl,
  globalEditMode,
}: LinkProps) {
  let [linkEdit, toggleLinkEdit] = useState(false);
  console.log(linkEdit);
  // if (!globalEditMode) {
  //   return (
  //     <li className={styles.link}>
  //       <a href={url}>{title}</a>
  //     </li>
  //   );
  // } else {
  //   return (
  //     <EditLink
  //       id={id}
  //       url={url}
  //       title={title}
  //       updateTitle={updateTitle}
  //       updateUrl={updateUrl}
  //     ></EditLink>
  //   );
  // }
  return (
    <li className={styles.link}>
      <a href={url}>{title}</a>
      {globalEditMode && (
        <span
          className={styles.linkEditButton}
          onClick={(e) => toggleLinkEdit(!linkEdit)}
        >
          E
        </span>
      )}
    </li>
  );
}
