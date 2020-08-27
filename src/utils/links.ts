import firebase from "gatsby-plugin-firebase";
import { getCurrentUserId } from "./auth";

export const assignDefaultLinks = (userId: string) => {
  // Get the predefined default links from the json
  const defaultLinks = require("./default-links.json");

  // Push the default object to firebase
  firebase.database().ref(`/users/${userId}`).set(defaultLinks);
};

export const updateLinks = (links: any) => {
  // TODO: Define an interface for the links object as saved in the database (replace any!)
  // Get user id of currently logged in user
  const userId = getCurrentUserId();

  // Push new link object - typescript will ensure format of object is 'legal'
  firebase.database().ref(`/users/${userId}`).set(links);
};
