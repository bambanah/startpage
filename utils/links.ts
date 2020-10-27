import { db } from "../config/firebase";

export const assignDefaultLinks = (userId: string) => {
  const defaultLinks = require("./default-links.json");

  db.ref(`/users/${userId}`).set(defaultLinks);
};
