import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async ( dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: typeof store.getState ) => {

        dispatch( savingNote() );

        const { uid } = getState().auth;
        
        const newNote = {
            id: '',
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrl: []
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

export const startSaveNote = () => {
    return async( dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: typeof store.getState ) => {
        
        dispatch( setSaving() );
        
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note?.id }` );

        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( updateNote( note ) );
    }
}

export const startUploadingFiles = ( files: File[] ) => {
    return async( dispatch: ThunkDispatch<RootState, unknown, Action<string>> ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls: string[] = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch: ThunkDispatch<RootState, unknown, Action<string>>, getState: typeof store.getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note?.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note?.id ) );
    }
}