import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { RootState } from '../../store/store';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [ (value: string) => value.includes('@'), 'El correo debe de tener una @'],
    password: [ (value: string) => value.length >= 6 , 'El password debe de tener mas de 6 letras'],
    displayName: [ (value: string) => value.length >= 1 , 'El nombre es obligatorio'],
}

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector( (state: RootState) => state.auth );
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status] )

    const { displayName, email, password, onInputChange, formState, displayNameValid, emailValid, passwordValid, isFormValid } = useForm( formData, formValidations );
    
    const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        setFormSubmitted(true);
        
        if( !isFormValid ) return
        
        dispatch( startCreatingUserWithEmailPassword( formState ) );
    }

    return (
            <AuthLayout title='Registrar Cuenta'>
                <h1>formValid { isFormValid ? 'valido' : 'incorrecto' }</h1>
                <form 
                    onSubmit={ onSubmit }
                    className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid container >
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label='Nombre Completo'
                                type='text'
                                placeholder='Nombre Completo'
                                fullWidth
                                name='displayName'
                                onChange={ onInputChange }
                                value={ displayName }
                                error={ !!displayNameValid && formSubmitted }
                                helperText={ displayNameValid }

                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label='Email'
                                type='email'
                                placeholder='tuemail@gmail.com'
                                fullWidth
                                name='email'
                                value={ email }
                                onChange={ onInputChange }
                                error={ !!emailValid && formSubmitted}
                                helperText={ emailValid }
                                
                            />
                        </Grid>

                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                placeholder='Contraseña'
                                fullWidth
                                name='password'
                                value={ password }
                                onChange={onInputChange}
                                error={ !!passwordValid && formSubmitted}
                                helperText={ passwordValid }
                            />
                        </Grid>
                        
                        <Grid container spacing={ 2 } sx={{ mb:2, mt: 1 }}>
                            <Grid 
                                item 
                                xs={12}
                                display={ !!errorMessage ? '' : 'none' }
                            >
                                <Alert severity='error' >{ errorMessage }</Alert>
                            </Grid>

                            <Grid item xs={12}>
                                <Button 
                                    disabled={ isCheckingAuthentication }
                                    variant='contained' 
                                    fullWidth 
                                    type='submit'
                                >
                                    Crear cuenta
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                            <Link  component={ RouterLink } color='inherit' to='/auth/login' >
                                ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
    )
}
