import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as styles from "../../../styles/links.module.scss";

interface Props {
  editFunction: any;
  deleteFunction: any;
}

export default function EditHover({ editFunction, deleteFunction }: Props) {
  return (
    <div className={styles.linkEditButtons}>
      <span className={styles.editButton} onClick={() => editFunction(true)}>
        <FontAwesomeIcon icon={faPen} />
        Edit
      </span>
      <span
        className={styles.deleteButton}
        onClick={() => deleteFunction(true)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
}
