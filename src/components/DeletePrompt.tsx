import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import * as styles from "../styles/links.module.scss";

interface Props {
  id: string;
  deleteFunction: any;
  closeFunction: any;
}

export default function DeletePrompt({
  id,
  deleteFunction,
  closeFunction,
}: Props) {
  return (
    <div className={styles.deletePrompt}>
      <span
        className={styles.deleteButtonAccept}
        onClick={() => deleteFunction(id)}
      >
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span>Delete?</span>

      <span
        className={styles.deleteButtonDecline}
        onClick={() => closeFunction(false)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
}
