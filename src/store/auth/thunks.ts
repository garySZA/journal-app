import { Action, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from ".";
import { RootState } from "..";
import { signInWithGoogle } from "../../firebase/providers";

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