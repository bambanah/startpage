import firebase from "gatsby-plugin-firebase";

export const isLoggedIn = () => {
  return firebase.auth().currentUser != null;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};
