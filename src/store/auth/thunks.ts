import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from ".";
import { RootState } from "..";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";

export const checkingAuthentication = (): ThunkAction<void, RootState, unknown, Action<string >> => {
    return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        dispatch( checkingCredentials(  ) );
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
    return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName } );

        if( !ok ) return dispatch( logout( { errorMessage } ) );

        dispatch( login({ uid, displayName, email, photoURL }) );
    }
}

export const startLoginWithEmailPassword = ({ email, password }: { email: string, password: string }) => {
    return async( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });

        if( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ) );
    }
}

export const startLogout = () => {
    return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        
        await logoutFirebase();

        dispatch( logout({ errorMessage: null }) );
    }
}