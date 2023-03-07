import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {User, userActions} from '@/entities/User';


interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string}>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>(`${import.meta.env.VITE_API}/login`, authData);

            if (!response.data) {
                throw new Error();
            }
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            if(e.response && e.response.status === 400) {
                return thunkAPI.rejectWithValue('Invalid username or password');
            }
          return thunkAPI.rejectWithValue("Server error, try again later");
        }
    },
);
