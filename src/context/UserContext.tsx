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
    async loginToBackEnd (email: string, password: string) {
      try{
        const { data: user } = await client.get(`/users?mail=${email}`);
        return user as User
      } catch (error: any) {
        console.log(error)
        return null
      }
    },
    async loginWithGoogle() {
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleProvider)

      if(userCredential) {
        const email = userCredential.user.email
        if(email){
          const user = await userActions.loginToBackEnd(email, "")
          // si me logie con google pero no existe en el back, lo creo
          if(!user){
            console.log("CREATING USER")
            const requestBody = {
              mail: email,
              firebaseUID: userCredential.user.uid,
              stickers: []
            }
            // lo creo
            const { data: user } = await client.post(`/users`, requestBody); // ToDo handlear casos de errores, si esto req vuelve con 500 va al home
            // TODO: al parecer el post no devuelve el id asi que tengo que fetchearlo una vez creado
            const newCreatedUser = await userActions.loginToBackEnd(email, "")
            if(newCreatedUser){
              setUser(newCreatedUser)
            }
          }
        }
      }
    },

    async logout () {
      await signOut(auth)
    },

    // si el user de google existe en el back, lo traigo, caso contrario
    // tengo un user en firebase pero no en el back asi que fuerzo un logout
    // para evitar quedar en un loop de logeo fallido
    async restore(email: string) {
      const user =  await userActions.loginToBackEnd(email, "")
      if(!user){
        await signOut(auth)
      }
      console.log("RESTORING")
      console.log(user)
      setUser(user || {} as User)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      // Si esta logeado me devuelve el user, si no esta logeado devuelve null
      if(currentUser){
        const email : string | null = currentUser.email
        if(email){
          userActions.restore(email)
        }
      }
    });
  }, []);

  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
}
