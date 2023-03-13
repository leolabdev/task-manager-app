import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '@/entities/Category';
import { getCookieValue } from '@/shared/lib/webStorages/getCookieValue';
import { USER_COOKIES_TOKEN_KEY } from '@/shared/const/cookies';
import { useDispatch } from 'react-redux';
import {ICategoryUpdate} from "@/entities/Category/model/types/category";


const token = getCookieValue(USER_COOKIES_TOKEN_KEY);

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    tagTypes: ['Task', 'Category'],
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
            query: () => 'taskCategories'
            ,
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation<ICategory, Partial<ICategory>>({
            query: (category) => ({
                url: 'taskCategories',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (categoryId) => ({
                url: `taskCategories/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation<ICategoryUpdate, { _id: string, taskCategoryName: string }>({
            query: (category) => ({
                url: `taskCategories/${category._id}`,
                method: 'PUT',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesApi;

export const resetCategories = async () => {
    const dispatch = useDispatch();
    await dispatch(categoriesApi.util.invalidateTags(['Category']));
};


