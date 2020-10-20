import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import {LinkEditButtons, EditButton,   DeleteButton} from "./Styles"

interface Props {
  editFunction: any;
  deleteFunction: any;
}

export default function EditHover({ editFunction, deleteFunction }: Props) {
  return (
    <LinkEditButtons>
      <EditButton onClick={() => editFunction(true)}>
        <FontAwesomeIcon icon={faPen} />
        Edit
      </EditButton>
      <DeleteButton        onClick={() => deleteFunction(true)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </DeleteButton>
    </LinkEditButtons>
  );
}
