import express from 'express'

import {AuthController} from './auth.controller'

const router = express.Router()

const authController = new AuthController();


/* register in app*/
router.post('/register', authController.register)
//
/* login to app*/
router.post('/login', authController.login)

/* logout from app*/
router.post('/logout', authController.logout)

export { router}


