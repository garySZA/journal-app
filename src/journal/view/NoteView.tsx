import { useEffect, useMemo, useRef } from 'react';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useForm } from '../../hooks';

import { RootState } from '../../store';
import { Form } from '../../types/interfaces';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {
    const { active: note, messageSaved, isSaving } = useAppSelector(( state: RootState ) => state.journal);
    const dispatch = useAppDispatch();

    const { body, title, date, onInputChange, formState } = useForm( { ...note } as Form );
    
    const dateString = useMemo(() => {
        const newDate = new Date( date );

        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        console.log(formState, 'sss')
        dispatch( setActiveNote( formState ) );
    }, [ title, body ])
    
    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [ messageSaved ])
    

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const { target } = event;

        if( !target.files || target.files.length === 0 ) return;

        const filesArray: File[] = [ ...target.files ];

        dispatch( startUploadingFiles( filesArray ) )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid 
            className='animate__animated animate__fadeIn animate__faster'
            container 
            direction='row' 
            justifyContent='space-between' 
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize='39' fontWeight='light'> { dateString } </Typography>
            </Grid>
            <Grid item>
                <input 
                    type='file'
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    accept='image/jpeg, image/png, image/jpg'
                />

                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current?.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color='primary' 
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un título'
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió hoy?'
                    minRows='5'
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>
            <Grid
                container
                justifyContent='end'
            >
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            {/* Image gallery */}
            <ImageGallery images={ note?.imageUrls ?? [] }/>
        </Grid>
    )
}
