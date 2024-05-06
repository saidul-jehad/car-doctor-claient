import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }

            console.log("currentUser", currentUser);
            setUser(currentUser)
            setLoading(false)


            // if user exits then issue token



            if (currentUser) {
                axios.post(('https://car-doctor-server-2-seven.vercel.app/jwt'), loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data);
                    })
            } else {
                axios.post(('https://car-doctor-server-2-seven.vercel.app/logout'), loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }




        })

        return () => {
            unSubscribe()
        }
    }, [])



    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signInUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;