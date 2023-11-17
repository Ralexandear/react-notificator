import { Router, Request, Response } from "express";
import userController from '../controllers/userController';
const router = Router();

router.post('/registration', userController.registration)
router.get('/login', userController.login)
router.get('/auth', userController.check)

export default router