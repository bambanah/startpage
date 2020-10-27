import { useState, useContext, createContext, ReactNode } from "react";
import { auth, db } from "../config/firebase";

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();

  return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth: any = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const createUser = (user) => {
    const defaultLinks = require("./default-links.json");

    db.ref(`/users/${user.uid}`)
      .set(defaultLinks)
      .then(() => {
        setUser(user);
        return user;
      });
  };

  const signUp = (email: string, password: string) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user !== undefined && res.user !== null) {
          return createUser({ uid: res.user.uid, email });
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

  return {
    user,
    signUp,
  };
};
