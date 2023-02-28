import {router} from "./task.router"
import {taskPath} from "./task.router"
import {ICreateTask,IUpdateTask,ITask} from "./Task/task";
import {TaskService} from "./task.service";

export  {
    router as taskRouter,
    taskPath,
    ITask,
    ICreateTask,
    TaskService,
    IUpdateTask
};



