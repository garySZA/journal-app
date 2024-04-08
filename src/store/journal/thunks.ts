import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: typeof store.getState ) => {

        dispatch( savingNote() );

        const { uid } = getState().auth;
        
        const newNote = {
            id: '',
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );

        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id

        //* Dispatch de nueva nota
        dispatch( addNewEmptyNote( newNote ) );

        //* Dispatch para activar nota
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: typeof store.getState ) => {
        const { uid } = getState().auth;

        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}