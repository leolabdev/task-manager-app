import {Router} from 'express'
import {UserController} from './user.controller'
import {authMiddleware} from "@/middleware";
import {permit} from "@/middleware";
import {UserRole} from "./User/userRole";
import {taskPath} from "@/task";



const router = Router()
const userPath = '/users';

const userController = new UserController();


/* GET users */
// router.get('/', authMiddleware, userController.getAllUsers)
router.get('/', authMiddleware, permit(UserRole.basic), userController.getAllUsers)
//

// /* GET user by id */S
// router.get('/:id',authMiddleware, permit(), userController.getById)
router.get('/:id',authMiddleware, userController.getById)


// /* GET user by username */
router.get('/:username', userController.getByUsername)

/* POST new user */
router.post('/', userController.postNew)

export { router , userPath }


