import React, { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import * as styles from "../styles/links.module.scss";
import classNames from "classnames";

interface LinkProps {
  linkId: string;
  linkTitle: string;
  linkUrl: string;
  updateLink: any;
  deleteLink: any;
  globalEditMode: Boolean;
}

export default function Link({
  linkId,
  linkTitle,
  linkUrl,
  updateLink,
  deleteLink,
  globalEditMode,
}: LinkProps) {
  let [linkEditMode, setLinkEditMode] = useState(false);
  let [deletePrompt, setDeletePrompt] = useState(false);
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
        {!deletePrompt && <a href={url}>{title}</a>}
        {globalEditMode && !deletePrompt && (
          <div className={styles.linkEditButtons}>
            <span
              className={classNames(styles.editButton)}
              onClick={() => setLinkEditMode(!linkEditMode)}
            >
              <FontAwesomeIcon icon={faPen} />
              Edit
            </span>
            <span
              className={styles.deleteButton}
              onClick={() => setDeletePrompt(true)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        )}
        {deletePrompt && (
          <div className={styles.deletePrompt}>
            <span
              className={styles.deleteButtonAccept}
              onClick={() => deleteLink(linkId)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span>Delete?</span>

            <span
              className={styles.deleteButtonDecline}
              onClick={() => setDeletePrompt(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        )}
      </li>
    );
  }
}
