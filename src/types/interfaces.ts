export interface Form {
    [ key: string ]: string
}

export interface Note {
    id: string;
    title: string;
    body: string;
    date: number;
    imageUrls: string[];
}

export interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: Note[];
    active: Note | null;
}