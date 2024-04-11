import { AuthState } from "../../types";

export const initialState: AuthState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const authentucatedState: AuthState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoUrl: 'https://demo.jpg',
    errorMessage: null
}

export const notAuthentucatedState: AuthState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoUrl: 'https://demo.jpg',
}