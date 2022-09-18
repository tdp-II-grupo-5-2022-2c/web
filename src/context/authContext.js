import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../firebase';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password);
    
    const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);
    }

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };
    
    const logout = async () => await signOut(auth);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => { // Si esta logeado me devuelve el user, si no esta logeado devuelve null
            setUser(currentUser);
            setLoading(false);
        });
    }, []);
        

    return <authContext.Provider value={{ signUp, login, loginWithGoogle, user, logout, loading }}> {children} </authContext.Provider>;
}