import React, { useState, FormEvent } from "react";
import { Link } from "gatsby";

import * as styles from "../styles/auth.module.scss";

import { createUser } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password === confirmPassword) {
      createUser(email, password);
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            // TODO: Validate email
            className={styles.input}
            type="email"
            name="userEmail"
            value={email}
            placeholder="email"
            id="userEmail"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            // TODO: Validate password strength
            className={styles.input}
            type="password"
            name="userPassword"
            value={password}
            placeholder="password"
            id="userPassword"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <input
            className={styles.input}
            type="password"
            name="userConfirmPassword"
            value={confirmPassword}
            placeholder="confirm password"
            id="userConfirmPassword"
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
