import express from 'express'
import {UserController} from './user.controller'
import {authMiddleware} from "../middleware";
import permit from "../middleware/authorization.middleware";
// import {UserRole} from "./Task/userRole";


const router = express.Router()
const userPath = '/users';

const userController = new UserController();

/* GET users */
router.get('/', authMiddleware, permit(), userController.getAllUsers)
//

// /* GET user by id */S
router.get('/:id',authMiddleware, permit(), userController.getById)


// /* GET user by username */
router.get('/:username', userController.getByUsername)

/* POST new user */
router.post('/', userController.postNew)

export { router , userPath }


