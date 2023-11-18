import { Router, Request, Response, NextFunction } from "express";
const router = Router();

import userRouter from './userRouter'
import botRouter from './botRouter'

// import orderRouter from './orderRouter'

router.use('/user', userRouter)
router.use('/bot', botRouter)
// router.use('/contact')
// router.use('/group')
// router.use('/order', orderRouter)
// router.use('/user', userRouter)
// router.use('/point')

export default router