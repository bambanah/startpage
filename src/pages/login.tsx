import React, { useState } from "react";
import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event: any) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          alert(errorMessage);
        }
      });
  };

  const onChangeHandler = (event: any) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
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
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
}
