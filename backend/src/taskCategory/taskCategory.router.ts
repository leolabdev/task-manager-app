import express from 'express'
import {TaskCategoryController} from './taskCategory.controller'
import {authMiddleware, permit} from "@/middleware";


// todo for some reason doesnt work public api import {UserRole} from "@user";
import {UserRole} from "@/user/User/userRole";


const router = express.Router()
const taskCategoryPath = '/taskCategories'

const taskCategoryController = new TaskCategoryController();


/* GET all taskCategories */
router.get('/admin/', authMiddleware, permit(UserRole.admin),taskCategoryController.getAllTaskCategories)
// router.get('/', authMiddleware, permit(UserRole.basic), taskCategoryController.getAllTaskCategories)

//
// /* GET taskCategory by id */
router.get('/admin/:id', authMiddleware,permit(UserRole.admin), taskCategoryController.getById);

//
// /* GET taskCategory by id and currentUser */
router.get('/:id', authMiddleware, taskCategoryController.getByIdAndCurrentUser);

//
// /* GET all taskCategories by user(id) */
router.get('/admin/:username',authMiddleware, permit(UserRole.admin), taskCategoryController.getAllTaskCategoriesByUserId);


// /* GET all taskCategories related to current user */
router.get('/', authMiddleware,taskCategoryController.getAllTaskCategoriesByCurrentUser)

// /* POST new task by current user */
router.post('/',authMiddleware, taskCategoryController.createNewByCurrentUser);

// /* Admin POST new task by any user*/
router.post('/admin/:userId',authMiddleware, permit(UserRole.admin), taskCategoryController.createNew);

// /* PUT task by id and current user */
router.put('/:id',authMiddleware, taskCategoryController.updateByCurrentUser);

/* Delete by id and current user*/
router.delete('/:id', authMiddleware, taskCategoryController.deleteByCurrentUser);

// /* Delete taskcategory by id */
router.delete('/admin/:id', authMiddleware, permit(UserRole.admin), taskCategoryController.deleteById);



export { router , taskCategoryPath }
