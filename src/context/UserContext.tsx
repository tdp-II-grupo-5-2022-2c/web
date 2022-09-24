import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {auth} from '../firebase';
import client from "../services/config";

export interface User {
  id: number;
  mail: string;
  stickers: []
}

interface UserActions {
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<any> | void;
}

const UserContext = React.createContext<User & UserActions>(
  {} as User & UserActions
);

export const useUser = (): User & UserActions => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const userActions = {
    ...user,
    loading,
    async loginWithGoogle() {
      const googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleProvider);
    },
    async logout () {
      await signOut(auth)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => { // Si esta logeado me devuelve el user, si no esta logeado devuelve null
      // TODO: se reemplaza por el usuario del back
      //setUser(currentUser);
      console.log("onAuthStateChanged")
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
}
