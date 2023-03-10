import {TaskPriority} from "@/entities/Task";

export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    taskCategory: {
        _id: string;
        taskCategoryName: string;
    }
    user: string;
    priority: TaskPriority;
    deadlineTime: string;
}


export interface ITaskUpdate{
    _id?: string;
    title?: string;
    description?: string;
    taskCategory?: string;
    priority?: TaskPriority;
    deadlineTime?: string;
}

export interface TasksSchema {
    tasks: ITask[];
    loading: boolean;
    error: string | null;
}
