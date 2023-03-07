import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";
import {User, UserSchema} from "../types/user";
import {setCookieWithExpirationTime} from "@/shared/lib/webStorages/setCookieWithExpirationTime";
import {USER_COOKIES_TOKEN_KEY} from "@/shared/const/cookies";
import {deleteCookie} from "@/shared/lib/webStorages/deleteCookie";
// import {getCookieValue} from "@/shared/lib/cookies/getCookieValue";
import {getCookieValue} from "@/shared/lib/webStorages/getCookieValue";

const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<UserSchema>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload.user), );
            // 24 hours
            setCookieWithExpirationTime(USER_COOKIES_TOKEN_KEY, action.payload.token, 1440);
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.user = JSON.parse(user);
            }
            const token = getCookieValue(USER_COOKIES_TOKEN_KEY);
            if (token) {
                state.token = token;
            }

        },
        logout: (state) => {
            state.user = undefined;
            state.token = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            deleteCookie(USER_COOKIES_TOKEN_KEY);
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
