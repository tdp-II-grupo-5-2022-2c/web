import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../firebase';
import client from "../services/config";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);

        //TODO (1): esto es para el back, ver que no choque con el login de firebase
        // que tambien hace un setUser pero con datos distintos (los de firebase)
        const { data: user } = await client.post("/users", {mail: email});
        setUser(user)
    }

    const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);

        // TODO: endpoint que me devuelva los datos del user
        //const { data: user } = await client.post???("/users", {mail: email});
        //setUser(user)
    }

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    const logout = async () => await signOut(auth);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => { // Si esta logeado me devuelve el user, si no esta logeado devuelve null
            // TODO (1): Ojo que me setea el user con cosas de firebase y yo necesito las del back-end
            setUser(currentUser);
            setLoading(false);
        });
    }, []);


    return <authContext.Provider value={{ signUp, login, loginWithGoogle, user, logout, loading }}> {children} </authContext.Provider>;
}
