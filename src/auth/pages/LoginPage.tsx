import { useMemo } from "react";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { RootState } from '../../store/store';

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {
    const { status, errorMessage } = useSelector( (state: RootState) => state.auth )
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { email, password, onInputChange } = useForm( formData );

    const isAuthenticating = useMemo( () => status === 'checkin', [status] );

    const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        dispatch( startLoginWithEmailPassword({ email, password }) )
    }
    
    const onGoogleSignIn = () => {
        console.log('onGoogleSignIn');

        dispatch( startGoogleSignIn() )
    }

    return (
            <AuthLayout title='Login'>
                <form 
                    onSubmit={ onSubmit }
                    className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid container >
                        <Grid item xs={ 12 } sx={{ mt: 2 }}>
                            <TextField
                                label='Correo'
                                type='email'
                                placeholder='correo@gmail.com'
                                fullWidth
                                name='email'
                                value={ email }
                                onChange={ onInputChange }
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
                                onChange={ onInputChange }
                            />
                        </Grid>
                        
                        <Grid container spacing={ 2 } sx={{ mb:2, mt: 1 }}>
                            <Grid 
                                xs={12}
                                item
                                display={ !!errorMessage ? '' : 'none' }
                            >
                                <Alert severity='error' >{ errorMessage }</Alert>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button 
                                    disabled={ isAuthenticating }
                                    variant='contained' 
                                    fullWidth 
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button 
                                    disabled={ isAuthenticating }
                                    variant='contained' 
                                    fullWidth
                                    onClick={ onGoogleSignIn }
                                >
                                    <Google />
                                    <Typography sx={{ ml: 1 }}>Google</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Link  component={ RouterLink } color='inherit' to='/auth/register' >
                                Crear una cuenta
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </AuthLayout>
    )
}
