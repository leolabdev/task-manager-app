import {TaskPriority} from "@/entities/Task";

export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    taskCategory: string;
    user: string;
    // priority: string;
    priority: TaskPriority;
    deadlineTime: Date;
}

