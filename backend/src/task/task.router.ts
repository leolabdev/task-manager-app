import express from 'express'
import {TaskController} from './task.controller'
import {authMiddleware} from "@/middleware";
import {permit} from "@/middleware";


// todo for some reason doesnt work public api import {UserRole} from "@user";
import {UserRole} from "@/user/User/userRole";






const router = express.Router()
const taskPath = '/tasks'

const taskController = new TaskController();


/* GET tasks */
// router.get('/', authMiddleware, taskController.getAllTasks)
router.get('/', authMiddleware, permit(UserRole.basic), taskController.getAllTasks)

//
// /* GET task by id */
router.get('/:id', taskController.getById)

//
// // /* GET task by name */
// router.get('/:username', taskController.getByUsername)

// /* POST new task */
// router.post('/', taskController.createNew)

export { router , taskPath }


