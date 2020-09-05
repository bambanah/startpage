import React, { useState, FormEvent } from "react";
import * as styles from "../../../styles/links.module.scss";
import classNames from "classnames";

import { Link as LinkType } from "../../../utils/types";
import DeletePrompt from "../../shared/components/DeletePrompt";
import EditHover from "../../shared/components/EditHover";
import EditForm from "../../shared/components/EditForm";

interface LinkProps {
  linkId: string;
  linkData: LinkType;
  updateLink: any;
  deleteLink: any;
  globalEditMode: Boolean;
}

export default function Link({
  linkId,
  linkData,
  updateLink,
  deleteLink,
  globalEditMode,
}: LinkProps) {
  let [linkEditMode, setLinkEditMode] = useState(false);
  let [deletePrompt, setDeletePrompt] = useState(false);
  let [title, setTitle] = useState(linkData.title);
  let [url, setUrl] = useState(linkData.url);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newLink = { title: title, url: url };

    updateLink(linkId, newLink);
    setLinkEditMode(false);
  };

  if (linkEditMode) {
    return (
      <li>
        <EditForm
          id={linkId}
          submitHandler={handleSubmit}
          values={[
            { state: title, setState: setTitle },
            { state: url, setState: setUrl },
          ]}
        />
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
          <EditHover
            editFunction={setLinkEditMode}
            deleteFunction={setDeletePrompt}
          />
        )}
        {deletePrompt && (
          <DeletePrompt
            id={linkId}
            deleteFunction={deleteLink}
            closeFunction={setDeletePrompt}
          />
        )}
      </li>
    );
  }
}
