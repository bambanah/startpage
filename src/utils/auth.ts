import firebase from "gatsby-plugin-firebase";
import { navigate } from "gatsby";

import { setupNewUserLinks } from "./links";

export const isLoggedIn = () => {
  return firebase.auth().currentUser != null;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const createUser = (email: string, password: string) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (res.user !== undefined && res.user !== null) {
        const userId = res.user.uid;
        setupNewUserLinks(userId);
        navigate("/");
      }
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
};

export const signOut = () => {
  firebase.auth().signOut();
  navigate("/login");
};
