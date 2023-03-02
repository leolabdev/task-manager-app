import {Router} from 'express'
import {UserController} from './user.controller'
import {authMiddleware, permit} from "@/middleware";
import {UserRole} from "./User/userRole";


const router = Router()
const userPath = '/users';

const userController = new UserController();

/* GET users */
// router.get('/', authMiddleware, userController.getAllUsers)
router.get('/', authMiddleware, permit(UserRole.basic), userController.getAll);
//

// /* GET current user */
router.get('/current', authMiddleware,permit(UserRole.basic), userController.getCurrentUser);

// /* GET user by id */S
// router.get('/:id',authMiddleware, permit(), userController.getById)
router.get('/:id',authMiddleware,permit(UserRole.admin,UserRole.moderator), userController.getById);

// /* GET user by username */
router.get('/by-username/:username',authMiddleware,permit(UserRole.admin,UserRole.moderator), userController.getByUsername);

/* POST new user */
// router.post('/', authMiddleware, permit(UserRole.admin), userController.postNew);

/* Update current user */
router.put('/', authMiddleware, userController.updateCurrentUser);

/* Update user by id */
router.put('/:id', authMiddleware, permit(UserRole.admin), userController.updateUserById);
// router.put('/:id', authMiddleware, userController.updateUserById);

/* Delete current user*/
router.delete('/', authMiddleware, userController.deleteCurrentUser);

// /* Delete any user by id*/
router.delete('/:id', authMiddleware, permit(UserRole.admin) , userController.deleteById);

export { router , userPath }


