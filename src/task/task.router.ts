import express from 'express'
import {TaskController} from './task.controller'
import {authMiddleware} from "../middleware";
import permit from "../middleware/authorization.middleware";
import {UserRole} from "@/user";


const router = express.Router()
const taskPath = '/users';

const taskController = new TaskController();

/* GET tasks */
router.get('/', authMiddleware, permit(UserRole.basic), taskController.getAllTasks)
//
// /* GET task by id */
router.get('/:id', taskController.getById)

//
// // /* GET task by name */
// router.get('/:username', taskController.getByUsername)

/* POST new task */
router.post('/', taskController.postNew)

export { router , taskPath }


