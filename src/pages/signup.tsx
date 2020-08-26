import React, { useState, FormEvent } from "react";
import firebase from "gatsby-plugin-firebase";
import { Link, navigate } from "gatsby";

import * as styles from "../styles/auth.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (password === confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(error.code);

          if (errorCode === "auth/email-already-in-use") {
            alert(
              "This email address is already in use. Please choose another one."
            );
          } else {
            alert(errorMessage);
          }
        });
    } else {
      setError("Passwords don't match");
    }
  };

  const onChangeHandler = (event: {
    currentTarget: { name: string; value: string };
  }) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "userConfirmPassword") {
      setConfirmPassword(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="userEmail"
            value={email}
            placeholder="email"
            id="userEmail"
            onChange={(e) => onChangeHandler(e)}
          />
          <input
            className={styles.input}
            type="password"
            name="userPassword"
            value={password}
            placeholder="password"
            id="userPassword"
            onChange={(e) => onChangeHandler(e)}
          />
          <input
            className={styles.input}
            type="password"
            name="userConfirmPassword"
            value={confirmPassword}
            placeholder="confirm password"
            id="userConfirmPassword"
            onChange={(e) => onChangeHandler(e)}
          />
          <input
            className={styles.submitButton}
            type="submit"
            value="sign up"
          />
        </form>
        <Link className={styles.link} to="/login">
          login
        </Link>
        {error}
      </div>
    </div>
  );
}
