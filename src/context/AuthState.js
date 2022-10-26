import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AuthContext  from './AuthContext';
import {auth} from '../firebase';

function AuthState(props) {

    const [currentUser , setCurrentUser] = useState({});

    // check if there is user then setuser
    useEffect(()=>{
        // onAuthStateChanged(auth,(user)=>{
        //     setCurrentUser(user);
        //     console.log("From authstate.js " ,user);
        // })

        // do return in useEffect otherwise memory leakage
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log("From authstate.js " ,user);
        });

        return ()=>{
            unsub();
        }
    },[])


    return (
        <AuthContext.Provider value={{currentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
