import React, {PropsWithChildren, useCallback, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {auth} from '../firebase';
import {ISticker} from "../components/stickers/Sticker";
import client from "../services/config";

export interface User {
  _id: number;
  mail: string;
  date_of_birth: string;
  name: string;
  lastname: string;
  stickers: ISticker[],
  favorite_countries: string[],
  country: string,
  is_profile_complete: boolean,
  total_stickers_collected: number
  album_completion_pct: number
  exchanges_amount: number
  package_counter: number
}

interface UserActions {
  isAuthed: () => boolean | undefined;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<any> | void;
  getUser: (email: string) => Promise<any>;
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
  const [authed, setAuthed] = useState<boolean | undefined>(undefined);

  const userActions : User & UserActions = {
    ...user,
    isAuthed() {
      return authed;
    },
    async getUser (email: string) {
      try{
        const { data: user } = await client.get(`/users?mail=${email}`);
        console.log(user)
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
        const name = userCredential.user.displayName
        if(email){
          const user = await userActions.getUser(email)
          // si me logie con google pero no existe en el back, lo creo
          if(!user){
            console.log("CREATING USER")
            const requestBody = {
              mail: email,
              name: name,
              lastname: "",
              date_of_birth: "",
              firebaseUID: userCredential.user.uid,
              stickers: []
            }
            // lo creo
            await client.post(`/users`, requestBody);
            // ToDo handlear casos de errores, si esto req vuelve con 500 va al home
            // TODO: al parecer el post no devuelve el id asi que tengo que fetchearlo una vez creado
            const newCreatedUser = await userActions.getUser(email)
            if (newCreatedUser) {
              setUser(newCreatedUser)
              setAuthed(true);
            }
          }
        }
      }
    },

    async logout () {
      await signOut(auth)
      setAuthed(false);
    },

    // si el user de google existe en el back, lo traigo, caso contrario
    // tengo un user en firebase pero no en el back asi que fuerzo un logout
    // para evitar quedar en un loop de logeo fallido
    async restore(email: string) {
      const user =  await userActions.getUser(email)
      if (!user) {
        this.logout();
      } else {
        setAuthed(true);
      }
      console.log("RESTORING")
      console.log(user)
      setUser(user || {} as User)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      // Si esta logeado me devuelve el user, si no esta logeado devuelve null
      if (currentUser) {
        const email : string | null = currentUser.email
        if (email) {
          userActions.restore(email)
        }
      }
      if (currentUser === null) {
        setAuthed(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
}
