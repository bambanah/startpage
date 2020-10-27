import React, { useState, createContext, useEffect } from "react";
import { auth } from "../config/firebase";

type ContextProps = {
  user: firebase.User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};

export const StateContext = createContext<Partial<ContextProps>>({});

export const StateProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as firebase.User | null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);

  return (
    <StateContext.Provider
      value={{ user, authenticated: user !== null, setUser, loadingAuthState }}
    >
      {children}
    </StateContext.Provider>
  );
};
