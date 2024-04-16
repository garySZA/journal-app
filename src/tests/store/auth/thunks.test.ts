import { clearNotesLogout } from '../../../store/journal';
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../firebase/providers';
import { checkingCredentials, login, logout } from '../../../store/auth';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../store/auth/thunks';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../firebase/providers');

describe('Pruebas en AuthThunks', () => { 
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de invocar el checkingCredentials', async () => { 
        const getState = jest.fn();
        
        await checkingAuthentication()( dispatch, getState, {} );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => { 
        const loginData = { ok: true, ...demoUser };

        await (signInWithGoogle as jest.Mock ).mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => { 
        const loginData = { ok: false, errorMessage: 'Un error en google' };

        await (signInWithGoogle as jest.Mock ).mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => { 
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await ( loginWithEmailPassword as jest.Mock ).mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => { 
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: null }) );
    });
});