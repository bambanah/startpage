import React from "react";

interface Props {
  submitHandler: any;
  id: string;
  values: { state: string; setState: Function }[];
}

export default function EditForm({ submitHandler, id, values }: Props) {
  console.log(values[0].state);
  return (
    <>
      <form onSubmit={submitHandler}>
        {values &&
          values.map((value) => {
            return (
              <input
                id={`${id}-${value}`}
                value={value.state}
                onChange={(e) => value.setState(e.currentTarget.value)}
              />
            );
          })}
        {/* <input
          id={`${id}-title`}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <input
          id={`${id}-url`}
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
        /> */}
        <input type="submit" value="save" />
      </form>
    </>
  );
}
