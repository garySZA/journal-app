import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { RootState } from "../store";
import { startLoadingNotes } from "../store/journal";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export const useCheckAuth = () => {
    const { status } = useAppSelector( (state: RootState) => state.auth );
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async ( user ) => {
            if( !user ) return dispatch( logout({errorMessage: null}) );

            const { uid, email, displayName, photoURL } = user;

            dispatch( login({ uid, email, displayName, photoURL }) );
            dispatch( startLoadingNotes() );
        });

    }, []);
    
    return status;
}
