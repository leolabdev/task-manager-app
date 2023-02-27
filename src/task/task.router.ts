import express from 'express'
import {TaskController} from './task.controller'
import {authMiddleware} from "../middleware";
import permit from "../middleware/authorization.middleware";
import {UserRole} from "../user";


const router = express.Router()
const userPath = '/users';

const userController = new TaskController();

/* GET tasks */
router.get('/', authMiddleware, permit(UserRole.basic), userController.getAllTasks)
//
// /* GET task by id */
router.get('/:id', userController.getById)


// /* GET task by name */
router.get('/:username', userController.getByUsername)

/* POST new task */
router.post('/', userController.postNew)

export { router , userPath }


