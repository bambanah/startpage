import React, { useState, FormEvent } from "react";
import Link from "next/link";

import * as styles from "../styles/auth.module.scss";

import { signIn } from "../utils/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    signIn(email, password).then(() => {
      router.push("/");
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={submitHandler} className={styles.form}>
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
        <Link href="/signup">
          <a className={styles.link}>sign up</a>
        </Link>
      </div>
    </div>
  );
}
