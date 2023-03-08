import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { object, string , ValidationError } from 'yup';

const RegisterByUsernameSchema = object().shape({
    username: string().required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(10, 'Username cannot exceed 10 characters')
        .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'),
    password: string().required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password cannot exceed 30 characters')
        .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain alphanumeric characters'),
});

interface RegisterByUsernameProps {
    username: string;
    password: string;
}

export const registerByUsername = createAsyncThunk<
    RegisterByUsernameProps,
    { rejectValue: string }
    >('register/registerByUsername', async (authData, thunkAPI) => {
    try {
        // Validate authData using the RegisterByUsernameSchema
        await RegisterByUsernameSchema.validate(authData);

        const response = await axios.post(
            `${import.meta.env.VITE_API}/register`,
            authData
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        if (e instanceof ValidationError) {
            // If authData is not valid, return validation error using rejectWithValue
            return thunkAPI.rejectWithValue(e.errors[0]);
        }

        if (e.response && e.response.status === 409) {
            return thunkAPI.rejectWithValue(
                'User with this username already exists'
            );
        }
        return thunkAPI.rejectWithValue('Server error, try again later');
    }
});

