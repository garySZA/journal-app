export type AuthTypes = 'checking' | 'not-authenticated' | 'authenticated';

export type AuthState = {
    status: AuthTypes,
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoUrl: string | null,
    errorMessage: string | null
}