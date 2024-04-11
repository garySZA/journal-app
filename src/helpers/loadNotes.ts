import { DocumentData, collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { Note } from "../types";

interface FirestoreNoteData extends DocumentData {
    title: string;
    body: string;
    date: number;
    imageUrls: string[];
}

export const loadNotes = async ( uid: string = '' ) => {
    if( !uid ) throw new Error('El UID del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    const notes: Note[] = []

    docs.forEach(( doc ) => {
        const { body, date, title, imageUrls } = doc.data() as FirestoreNoteData;
        notes.push({ id: doc.id, title, body, date, imageUrls });
    });

    return notes;
}