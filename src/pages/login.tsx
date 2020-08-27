import React, { useState, FormEvent } from "react";
import { Link } from "gatsby";

import * as styles from "../styles/auth.module.scss";

import { signIn } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    signIn(email, password);
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
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            className={styles.input}
            type="password"
            name="userPassword"
            value={password}
            placeholder="password"
            id="userPassword"
            onChange={(e) => setPassword(e.currentTarget.value)}
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
