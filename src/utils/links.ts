import firebase from "gatsby-plugin-firebase";
import { getCurrentUserId } from "./auth";

import { Data } from "./types";

export const assignDefaultLinks = (userId: string) => {
  const defaultLinks = require("./default-links.json");

  firebase.database().ref(`/users/${userId}`).set(defaultLinks);
};

export const updateLinks = (links: Data) => {
  const userId = getCurrentUserId();

  // Push new link object - typescript will ensure format of object is 'legal'
  firebase.database().ref(`/users/${userId}`).set(links);
};
