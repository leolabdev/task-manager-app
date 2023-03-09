// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { ITask } from '@/entities/Task';
// import { getCookieValue } from '@/shared/lib/webStorages/getCookieValue';
// import { USER_COOKIES_TOKEN_KEY } from '@/shared/const/cookies';
// import { useDispatch } from 'react-redux';
//
// const token = getCookieValue(USER_COOKIES_TOKEN_KEY);
//
// export const tasksApi = createApi({
//     reducerPath: 'tasksApi',
//     tagTypes: ['Task'],
//     baseQuery: fetchBaseQuery({
//         baseUrl: import.meta.env.VITE_API,
//         headers: {
//             Authorization: `Bearer ${token}`,
//             Cookies: token,
//         },
//         credentials: 'include',
//     }),
//     endpoints: (builder) => ({
//         getTasks: builder.query<ITask[], void>({
//             query: () => 'tasks',
//             providesTags: result =>
//                 result
//                     ? result.map(({ _id }) => ({ type: 'Task' as const, id: _id }))
//                     : [{ type: 'Task' as const, id: 'EMPTY' }],
//         }),
//         createTask: builder.mutation<ITask, Partial<ITask>>({
//             query: (task) => ({
//                 url: 'tasks',
//                 method: 'POST',
//                 body: task,
//             }),
//             invalidatesTags: [{ type: 'Task' as const, id: 'EMPTY' }],
//         }),
//         deleteTask: builder.mutation<void, string>({
//             query: (taskId) => ({
//                 url: `tasks/${taskId}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: (result, error, arg) => [{ type: 'Task' as const, id: arg }],
//         }),
//         updateTask: builder.mutation<ITask, Partial<ITask>>({
//             query: (task) => ({
//                 url: `tasks/${task._id}`,
//                 method: 'PUT',
//                 body: task,
//             }),
//             invalidatesTags: (result, error, arg) => [{ type: 'Task' as const, id: arg?._id || 'EMPTY' }],
//         }),
//     }),
// });
//
// export const {
//     useGetTasksQuery,
//     useCreateTaskMutation,
//     useDeleteTaskMutation,
//     useUpdateTaskMutation,
// } = tasksApi;
//
// export const resetTasks = async () => {
//     const dispatch = useDispatch();
//     await dispatch(tasksApi.util.invalidateTags(['Task']));
// };

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '@/entities/Task';
import { getCookieValue } from '@/shared/lib/webStorages/getCookieValue';
import { USER_COOKIES_TOKEN_KEY } from '@/shared/const/cookies';
import { useDispatch } from 'react-redux';

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
                        { type: 'Category' as const, id: taskCategory },
                    ]).flat()
                    : [{ type: 'Task' as const, id: 'EMPTY' }],
        }),
        createTask: builder.mutation<ITask, Partial<ITask>>({
            query: (task) => ({
                url: 'tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ({taskCategory}) => [
                { type: 'Task' as const, id: 'EMPTY' },
                { type: 'Category' as const, id: taskCategory },
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
        updateTask: builder.mutation<ITask, Partial<ITask>>({
            query: (task) => ({
                url: `tasks/${task._id}`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: (result, error, task) => [
                { type: 'Task' as const, id: task?._id || 'EMPTY' },
                { type: 'Category' as const, id: task?.taskCategory },
            ],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} = tasksApi;

export const resetTasks = async () => {
    const dispatch = useDispatch();
    await dispatch(tasksApi.util.invalidateTags(['Task', 'Category']));
};


