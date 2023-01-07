import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth';
import { checkingAuthentication } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en auth/thunks', () => {

    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('Debe invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        
    });

    test('startGoogleSignIn debe llamar checkingCredentials y login - Éxito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
        
    });

    test('startGoogleSignIn debe llamar checkingCredentials y logout - Error', async() => {
        
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );
        
    });

    test('startLoginWithEmailPassword debe llamar a checkingCredentials y login - Éxito', async() => { 
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: demoUser.password };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginWithEmailPassword debe llamar a checkingCredentials y logout - Error', async() => { 
        
        const loginData = { ok: false, errorMessage: 'Un error en el Email y Password' };
        const formData = { email: demoUser.email, password: demoUser.password };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });
    
    test('startCreatingUserWithEmailPassword debe llamar a checkingCredentials y registrar el nuevo usuario - Éxito', async() => { 
        
        const registerData = { 
            ok:true, 
            email: demoUser.email,
            password: demoUser.password,
            photoURL: demoUser.photoURL,
        };

        await registerUserWithEmailPassword.mockResolvedValue( registerData );
        await startCreatingUserWithEmailPassword(registerData)( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( registerData ) );

    });

    test('startCreatingUserWithEmailPassword debe llamar a checkingCredentials y no registrar el nuevo usuario - Error', async() => { 
        
        const loginData = {ok:false, errorMessage: 'No se pudo registrar el usuario'}
        
        const registerData = { 
            email: demoUser.email,
            password: demoUser.password,
            photoURL: demoUser.photoURL,
        };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( registerData )( dispatch );
        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()( dispatch );
        
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });

    
});