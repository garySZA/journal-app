import { UnknownAction } from "@reduxjs/toolkit";
import { authSlice, checkingCredentials, login, logout } from "../../../store/auth";
import { authentucatedState, demoUser, initialState, notAuthentucatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => { 
    test('Debe de regresar el estado inicial y llamarse "auth"', () => { 
        const state = authSlice.reducer( initialState, {} as UnknownAction )
        
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');
    });

    test('Debe de realizar la autenticación', () => { 
        const state = authSlice.reducer( initialState, login( demoUser ) );

        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoUrl: demoUser.photoUrl,
            errorMessage: null
        });
    });

    test('Debe de realizar el logout sin argumentos', () => { 
        const state = authSlice.reducer( authentucatedState, logout({}) );

        expect( state ).toEqual( notAuthentucatedState );
    });

    test('Debe de realizar el logout y mostrar un mensaje de error', () => { 
        const errorMessage = 'Credenciales no correctas';

        const state = authSlice.reducer( authentucatedState, logout({ errorMessage }) );

        expect( state ).toEqual({ ...notAuthentucatedState, errorMessage });
    });

    test('Debe de cambiar el estado a checking', () => { 
        const state = authSlice.reducer( authentucatedState, checkingCredentials() );
        
        expect( state.status ).toBe('checking')
    });
});