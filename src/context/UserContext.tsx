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
  signUp:( email: string, password: string ) => Promise<any>;
  login: ( email: string, password: string ) => Promise<any>;
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
    async signUp (email: string, password: string) {
      createUserWithEmailAndPassword(auth, email, password);

      //TODO: esto es para el back, ver que no choque con el login de firebase
      // que tambien hace un setUser
      const { data: user } = await client.post("/users", {mail: email});
      setUser(user)
    },

    async login (email: string, password: string) {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);

    },

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
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
}
