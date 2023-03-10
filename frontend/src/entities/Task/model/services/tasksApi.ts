import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '@/entities/Task';
import { getCookieValue } from '@/shared/lib/webStorages/getCookieValue';
import { USER_COOKIES_TOKEN_KEY } from '@/shared/const/cookies';
import { useDispatch } from 'react-redux';
import {ITaskUpdate} from "../types/task";

const token = getCookieValue(USER_COOKIES_TOKEN_KEY);

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
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
        getTasks: builder.query<ITask[], void>({
            query: () => 'tasks',
            providesTags: result =>
                result
                    ? result.map(({ _id, taskCategory }) => [
                        { type: 'Task' as const, id: _id },
                        { type: 'Category' as const, id: taskCategory._id },
                    ]).flat()
                    : [{ type: 'Task' as const, id: 'EMPTY' }],
        }),
        getTask: builder.query<ITask, string>({
            query: (taskId) => `tasks/${taskId}`,
            providesTags: (result, error, taskId) => [
                { type: 'Task' as const, id: taskId },
                { type: 'Category' as const, id: 'ANY' },
            ],
        }),
        createTask: builder.mutation<ITask, Omit<ITask, '_id'>>({
            query: (task) => ({
                url: 'tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ({taskCategory}) => [
                { type: 'Task' as const, id: 'EMPTY' },
                { type: 'Category' as const, id: taskCategory._id },
            ],
        }),
        deleteTask: builder.mutation<void, string>({
            query: (taskId) => ({
                url: `tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Task' as const, id: arg },
                { type: 'Category' as const, id: 'ANY' },
            ],
        }),
        updateTask: builder.mutation<ITaskUpdate, { taskId: string, task: ITaskUpdate }>({
            query: ({taskId, task}) => ({
                url: `tasks/${taskId}`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: (result, error, { task }) => [
                { type: 'Task' as const, taskId: task?._id || 'EMPTY' },
                { type: 'Category' as const, id: task?.taskCategory },
            ],
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
    await dispatch(tasksApi.util.invalidateTags(['Task', 'Category']));
};



