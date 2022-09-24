import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {auth} from '../firebase';
import {IBackEndSticker} from "../components/Sticker";
import client from "../services/config";

export interface User {
  id: number;
  mail: string;
  stickers: IBackEndSticker[]
}

interface UserActions {
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<any> | void;
  loginToBackEnd: (email: string, password: string) => Promise<any>;
  restore: (email:string) => Promise<any>;
}

const UserContext = React.createContext<User & UserActions>(
  {} as User & UserActions
);

export const useUser = (): User & UserActions => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User>({} as User);

  const userActions = {
    ...user,
    async loginWithGoogle() {
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleProvider)

      if(userCredential) {
        const email = userCredential.user.email
        if(email){
          let user = null
          try{
            const data = await client.get(`/users?mail=${email}`);
            user = data
          } catch (error: any) {
            user = null
          }

          // si me logie con google pero no existe en el back, lo creo
          if(!user){
            const requestBody = {
              mail: email,
              stickers: []
            }
            const { data: user } = await client.post(`/users`, requestBody);
          }
        }
      }
    },
    async logout () {
      await signOut(auth)
    },
    async loginToBackEnd (email: string, password: string) {
      try{
        const { data: user } = await client.get(`/users?mail=${email}`);
        return user as User
      } catch (error: any) {
        console.log(error)
        return null
      }
    },
    // si el user de google existe en el back, lo traigo, caso contrario
    // tengo un user en firebase pero no en el back asi que fuerzo un logout
    // para evitar quedar en un loop de logeo fallido
    async restore(email: string) {
      const user =  await userActions.loginToBackEnd(email, "")
      if(!user){
        await signOut(auth)
      }
      setUser(user || {} as User)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      // Si esta logeado me devuelve el user, si no esta logeado devuelve null
      if(currentUser){
        const mail : string | null = currentUser.email
        if(mail){
          userActions.restore(mail)
        }
      }
    });
  }, []);

  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
}
