import React, { createContext, useEffect, useState } from 'react'
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';



const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };


    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };



    const logOutUser = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('current user', currentUser);
            setUser(currentUser);
            setLoading(false);
            // console.log("current user", currentUser);
        });
        return () => unsubscribe();
    }
        , []);



    const authData = {
        user,
        setUser,
        createUser,
        updateUser,
        logInUser,
        logOutUser,
        resetPassword,
        signInWithGoogle,
        loading,
        setLoading
    };

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;