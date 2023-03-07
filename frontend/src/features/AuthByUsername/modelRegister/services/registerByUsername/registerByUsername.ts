import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegisterByUsernameProps {
    username: string;
    password: string;
}

export const registerByUsername = createAsyncThunk<RegisterByUsernameProps, { rejectValue: string}>(
    'register/registerByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/register`, authData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            if(e.response && e.response.status === 409) {
                return thunkAPI.rejectWithValue('User with this username already exists');
            }
          return thunkAPI.rejectWithValue("Server error, try again later");
        }
    },
);
