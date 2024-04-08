import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../../types";


const initialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNote: ( state ) => {
            state.isSaving = true;
        },
        
        addNewEmptyNote: ( state, { payload } ) => {
            state.notes.push( payload );
            state.isSaving = false;
        },

        setActiveNote: ( state, action ) => {
            state.active = action.payload;
        },

        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },

        setSaving: ( state ) => {

        },

        updateNote: ( state, action ) => {

        },

        deleteNoteById: ( state, action ) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote, 
    deleteNoteById, 
    savingNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote, 
} = journalSlice.actions;