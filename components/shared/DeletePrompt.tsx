import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

import { DeleteContainer, DeleteAccept, DeleteCancel } from "./Styles";

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
    <DeleteContainer>
      <DeleteAccept onClick={() => deleteFunction(id)}>
        <FontAwesomeIcon icon={faCheck} />
      </DeleteAccept>

      <span>Delete?</span>

      <DeleteCancel onClick={() => closeFunction(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </DeleteCancel>
    </DeleteContainer>
  );
}
