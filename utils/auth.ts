import { auth } from "../config/firebase";

import { assignDefaultLinks } from "./links";

export const isLoggedIn = () => {
  return auth.currentUser != null;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getCurrentUserId = () => {
  return auth.currentUser?.uid;
};

export const createUser = (email: string, password: string) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (res.user !== undefined && res.user !== null) {
        const userId = res.user.uid;
        assignDefaultLinks(userId);
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

export const signIn = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === "auth/wrong-password") {
      alert("Wrong password");
    } else {
      alert(errorMessage);
    }
  }
};

export const signOut = () => {
  auth.signOut();
};
