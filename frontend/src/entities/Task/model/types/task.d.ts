import {TaskPriority} from "@/entities/Task";

type TaskCategory = {
    _id: string;
    taskCategoryName: string;
} | string;


export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    taskCategory: TaskCategory;
    user: string;
    priority: TaskPriority;
    deadlineTime: string;
}

export interface ITaskUpdate extends Omit<ITask, 'taskCategory'|'user'>{
    taskCategory : string;
}

export interface ITaskCreate extends Omit<ITask, 'taskCategory' |'_id' | 'user'>{
    taskCategory : string;
}

export interface TasksSchema {
    tasks: ITask[];
    loading: boolean;
    error: string | null;
}
