import React, { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import * as styles from "../styles/links.module.scss";
var classNames = require("classnames");

interface LinkProps {
  linkId: string;
  linkTitle: string;
  linkUrl: string;
  updateLink: any;
  globalEditMode: Boolean;
}

export default function Link({
  linkId,
  linkTitle,
  linkUrl,
  updateLink,
  globalEditMode,
}: LinkProps) {
  let [linkEditMode, setLinkEditMode] = useState(false);
  let [title, setTitle] = useState(linkTitle);
  let [url, setUrl] = useState(linkUrl);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newLink = { title: title, url: url };

    updateLink(linkId, newLink);
    setLinkEditMode(false);
  };

  if (linkEditMode) {
    return (
      <li>
        <form onSubmit={handleSubmit}>
          <input
            id={`${linkId}-title`}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <input
            id={`${linkId}-url`}
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
          />
          <input type="submit" value="save" />
        </form>
      </li>
    );
  } else {
    return (
      <li
        className={classNames(styles.link, {
          [styles.linkEdit]: globalEditMode,
        })}
      >
        <a href={url}>{title}</a>
        {globalEditMode && (
          <span
            className={classNames(styles.linkEditButton)}
            onClick={() => setLinkEditMode(!linkEditMode)}
          >
            <FontAwesomeIcon icon={faPen} /> Edit
          </span>
        )}
      </li>
    );
  }
}
