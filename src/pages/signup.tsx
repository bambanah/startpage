import React, { useState } from "react";
import firebase from "gatsby-plugin-firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmailAndPasswordHandler = (
    event: any,
    email: any,
    password: any
  ) => {
    event.preventDefault();
    console.log("event: ", event);
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const onChangeHandler = (event: any) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  // const handleSubmit = () => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(state.email, state.password)
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;

  //       if (errorCode === "auth/wrong-password") {
  //         alert("Wrong password");
  //       } else {
  //         alert(errorMessage);
  //       }

  //       console.log(error);
  //     });
  // };

  // const initialState = { email: "", password: "" };

  // const [state, setState] = useState(initialState);

  return (
    <div>
      <form>
        <label htmlFor="userEmail">Email:</label>
        <input
          type="text"
          name="userEmail"
          value={email}
          placeholder="e.g.: example@example.com"
          id="userEmail"
          onChange={(e) => onChangeHandler(e)}
        />
        <label>
          Password:
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Password"
            id="userPassword"
            onChange={(e) => onChangeHandler(e)}
          />
        </label>
      </form>
      <button
        onClick={(event) => {
          signInWithEmailAndPasswordHandler(event, email, password);
        }}
      >
        Sign in
      </button>
    </div>
  );
}
