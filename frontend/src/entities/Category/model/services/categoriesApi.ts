import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '@/entities/Category';
import {getCookieValue} from "@/shared/lib/webStorages/getCookieValue";
import {USER_COOKIES_TOKEN_KEY} from "@/shared/const/cookies";

// const cookie = document.cookie; // get cookie value here

const token = getCookieValue(USER_COOKIES_TOKEN_KEY);

console.log(token);


export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
        headers: {
            Authorization: `Bearer ${token}`,
            Cookies: token,
        },
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], void>({
            query: () => 'taskCategories',
        }),
        createCategory: builder.mutation<ICategory, Partial<ICategory>>({
            query: (category) => ({
                url: 'taskCategories',
                method: 'POST',
                body: category,
            }),
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (categoryId) => ({
                url: `taskCategories/${categoryId}`,
                method: 'DELETE',
            }),
        }),
        updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
            query: (category) => ({
                url: `taskCategories/${category._id}`,
                method: 'PUT',
                body: category,
            }),
        }),
    }),
});



export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoriesApi;
