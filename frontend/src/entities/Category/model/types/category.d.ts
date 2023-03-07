import {ITask} from "@/entities/Task";
import {User} from "@/entities/User";


export interface ICategory {
    _id: string;
    taskCategoryName: string;
    user: User;
    tasks: ITask[];
    __v: number;
}
