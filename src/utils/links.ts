import firebase from "gatsby-plugin-firebase";

export const setupNewUserLinks = (userId: string) => {
  const defaultLinks = require("./default-links.json");

  firebase.database().ref(`/users/${userId}`).set(defaultLinks);
};

export const addLink = () => {
  return;
};
