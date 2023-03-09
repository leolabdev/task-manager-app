import {TaskPriority} from './model/types/taskPriority';
import {TaskCard} from './ui/TaskCard';
import {ITask,TasksSchema} from './model/types/task';

export {
    TaskPriority,
    TaskCard
};
export type { ITask,TasksSchema};
export {tasksApi, useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useCreateTaskMutation ,resetTasks} from "./model/services/tasksApi";
