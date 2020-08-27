import React, { useState, FormEvent } from "react";
import firebase from "gatsby-plugin-firebase";
import { navigate, Link } from "gatsby";

import * as styles from "../styles/auth.module.scss";

import { signIn } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    signIn(email, password);
  };

  const onChangeHandler = (event: {
    currentTarget: { name: string; value: string };
  }) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={submitHandler} className={styles.form}>
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
          <input className={styles.submitButton} type="submit" value="login" />
        </form>
        <Link className={styles.link} to="/signup">
          sign up
        </Link>
      </div>
    </div>
  );
}
