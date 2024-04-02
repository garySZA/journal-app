import { useState } from 'react';
import { Form } from '../types';

export const useForm = <T extends Form> ( initialForm: T ) => {

    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}