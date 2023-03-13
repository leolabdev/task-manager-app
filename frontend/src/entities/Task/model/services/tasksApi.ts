import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '@/entities/Task';
import { getCookieValue } from '@/shared/lib/webStorages/getCookieValue';
import { USER_COOKIES_TOKEN_KEY } from '@/shared/const/cookies';
import {useDispatch, useSelector} from 'react-redux';
import {ITaskUpdate} from "../types/task";

const token = getCookieValue(USER_COOKIES_TOKEN_KEY);





export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    tagTypes: ['Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
        headers: {
            Authorization: `Bearer ${token}`,
            Cookies: token,
        },
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: () => 'tasks',
            providesTags: ['Task'],
        }),
        getTask: builder.query<ITask, string>({
            query: (taskId) => `tasks/${taskId}`,
            providesTags: ['Task',],
        }),
        createTask: builder.mutation<ITask, Omit<ITask, '_id'>>({
            query: (task) => ({
                url: 'tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation<void, string>({
            query: (taskId) => ({
                url: `tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation<ITaskUpdate, { taskId: string, task: ITaskUpdate }>({
            query: ({taskId, task}) => ({
                url: `tasks/${taskId}`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} = tasksApi;

export const resetTasks = async () => {
    const dispatch = useDispatch();
    await dispatch(tasksApi.util.invalidateTags(['Task']));
};



