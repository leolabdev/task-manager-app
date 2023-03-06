import express from 'express'
import {TaskController} from './task.controller'
import {authMiddleware, permit} from "@/middleware";


// todo for some reason doesnt work public api import {UserRole} from "@user";
import {UserRole} from "@/user/User/userRole";
import {TaskCategoryService} from "@/taskCategory";
import {TaskService} from "@/task/task.service";


const router = express.Router()
const taskPath = '/tasks'

// todo here we can see why we need to use DI
const taskController = new TaskController(new TaskCategoryService(new TaskService()));


/* GET all tasks related to user*/
router.get('/', authMiddleware, taskController.getAllTasksByCurrentUser);

/* GET all tasks*/
router.get('/admin', authMiddleware, permit(UserRole.admin, UserRole.moderator), taskController.getAllTasks);

//
// /* GET task by id and current user */
router.get('/:id', authMiddleware, taskController.getByIdAndCurrentUser);

//
// /* GET task by id */
router.get('/admin/:id', authMiddleware,  permit(UserRole.admin,UserRole.moderator), taskController.getById);


// /* POST new task */
router.post('/',authMiddleware, taskController.createNewByCurrentUser);

// /* Put task by Current user */
router.put('/:id',authMiddleware, taskController.updateByCurrentUser);


// /* delete task by id and current user */
router.delete('/:id', authMiddleware, taskController.deleteByCurrentUser);


export { router , taskPath }


