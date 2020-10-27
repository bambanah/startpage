import styled from "styled-components";

export const DeleteContainer = styled.div`
  display: flex;

  color: black;
  background-color: #f8f8f2;
  font-family: "Fira Code", monospace;

  span {
    text-align: center;

    &:nth-of-type(2) {
      flex: 1 1 80%;
    }
    &:not(:nth-of-type(2)) {
      cursor: pointer;
      flex: 1 0 2rem;
    }
  }
`;

export const DeleteAccept = styled.span`
  background-color: #50fa7b;

  &:hover {
    color: #50fa7b;
    background-color: black;
  }
`;

export const DeleteCancel = styled.span`
  background-color: #ff5555;

  &:hover {
    color: #ff5555;
    background-color: black;
  }
`;

export const EditFormContainer = styled.div`
  font-family: "Fira Code", monospace;
  color: #f8f8f2;

  form {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
`;

export const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 0.4rem;

  border: none;
  border-bottom: 2px solid #bd93f9;
  border-radius: 0;
  background: none;

  font-family: "Fira Code", monospace;
  font-size: 16px;
  color: #f8f8f2;

  &:focus {
    background-color: #00000011;
    outline: none;
  }
`;

export const ButtonRow = styled.div`
  display: flex;

  button {
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    margin: 0 0.2rem;

    background: none;

    font-family: "Fira Code", monospace;
    font-size: 16px;
    color: #f8f8f2;

    &.saveButton {
      border: 2px solid #f8f8f2;
      background-color: #f8f8f2;
      color: black;

      &:hover {
        border-color: #50fa7b;
        color: black;
      }
    }

    &.cancelButton {
      border: 2px solid #f8f8f2;
    }

    &:hover {
      border-color: #bd93f9;
      color: #bd93f9;
    }
  }
`;

export const LinkEditButtons = styled.div`
  display: none;
`

export const EditButton = styled.span`
  flex: 1 1 80%;
  padding-left: 2px;

  font-family: "Fira Code", monospace;

  cursor: pointer;

  color: #000;
  background-color: #f8f8f2;

  svg {
    margin-right: 0.2rem;
  }
  &:hover {
    text-decoration: underline;
  }
`

export const DeleteButton = styled.span`
  flex: 1 1 2rem;
  text-align: center;

  cursor: pointer;

  background-color: #ff5555;
  color: black;

  &:hover {
    color: #ff5555;
    background-color: black;
  }
`