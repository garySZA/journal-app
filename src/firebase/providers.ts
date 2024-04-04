import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch ( error: any ) {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }:  { email: string, password: string, displayName: string }) => {
    try {
        
        const response = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = response.user;
        
        if( FirebaseAuth.currentUser !== null ){
            await updateProfile( FirebaseAuth.currentUser, { displayName } );
        }

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error: any) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async({ email, password }: { email: string, password: string }) => {
    try {
        
        const response = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = response.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error: any) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}