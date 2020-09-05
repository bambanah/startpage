import firebase from "gatsby-plugin-firebase";

export const assignDefaultLinks = (userId: string) => {
  const defaultLinks = require("./default-links.json");

  firebase.database().ref(`/users/${userId}`).set(defaultLinks);
};
