import { createContext, useState, useEffect, useContext } from "react";
import { firebase, auth } from "../../config/firebase";

type ContextProps = {
  user: firebase.User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};

export const AuthContext = createContext<Partial<ContextProps>>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    let isMounted = true;

    auth.onAuthStateChanged((user: any) => {
      if (isMounted) {
        setUser(user);
        setLoadingAuthState(false);
      }
    });

    return () => {
      isMounted = false;
    };
  });

  // const createUser = (user: any) => {
  //   const defaultLinks = require("./default-links.json");

  //   database
  //     .ref(`/users/${user.uid}`)
  //     .set(defaultLinks)
  //     .then(() => {
  //       setUser(user);
  //       return user;
  //     });
  // };

  // const signUp = (email: string, password: string) => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       if (res.user !== undefined && res.user !== null) {
  //         return createUser({ uid: res.user.uid, email });
  //       }
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;

  //       console.log(error.code);

  //       if (errorCode === "auth/email-already-in-use") {
  //         alert(
  //           "This email address is already in use. Please choose another one."
  //         );
  //       } else {
  //         alert(errorMessage);
  //       }
  //     });
  // };

  return (
    <AuthContext.Provider
      value={{ user, authenticated: user !== null, setUser, loadingAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
