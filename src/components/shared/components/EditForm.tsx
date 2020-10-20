import React from "react";
import { EditFormContainer, ButtonRow, FormInput } from "./Styles";

interface Props {
  submitHandler: any;
  id: string;
  values: { state: string; setState: Function }[];
}

export default function EditForm({ submitHandler, id, values }: Props) {
  return (
    <EditFormContainer>
      <form onSubmit={submitHandler}>
        {values &&
          values.map((value) => {
            return (
              <FormInput
                id={`${id}-${value}`}
                value={value.state}
                onChange={(e: any) => value.setState(e.currentTarget.value)}
              />
            );
          })}
        <ButtonRow>
          <button className="saveButton" onClick={submitHandler}>
            Save
          </button>
          <button className="cancelButton" onClick={() => {}}>
            Cancel
          </button>
        </ButtonRow>
      </form>
    </EditFormContainer>
  );
}
