import {TaskPriority} from './model/types/taskPriority';
import {TaskCard} from './ui/TaskCard';
import {ITask,TasksSchema, ITaskUpdate } from './model/types/task';

export {
    TaskPriority,
    TaskCard
};
export type { ITask,TasksSchema, ITaskUpdate};
export {tasksApi, useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useCreateTaskMutation , useGetTaskQuery,resetTasks} from "./model/services/tasksApi";
