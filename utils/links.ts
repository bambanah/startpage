import { database } from "../config/firebase";

export const assignDefaultLinks = (userId: string) => {
  const defaultLinks = require("../config/default-links.json");

  database.ref(`/users/${userId}`).set(defaultLinks);
};
