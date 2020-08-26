import React, { useState, FormEvent } from "react";
import firebase from "gatsby-plugin-firebase";
import { Link, navigate } from "gatsby";

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
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>
          Confirm Password:
          <input
            type="password"
            name="userConfirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            id="userConfirmPassword"
            onChange={(e) => onChangeHandler(e)}
          />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
      <Link to="/login">Go to Login</Link>
      {error}
    </div>
  );
}
