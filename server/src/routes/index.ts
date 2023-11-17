import { Router, Request, Response, NextFunction } from "express";
const router = Router();
//import botRouter from './botRouter';
import userRouter from './userRouter'
// import orderRouter from './orderRouter'
// import botRouter from './botRouter'

router.use('/user', userRouter)
// router.use('/bot', botRouter)
// router.use('/contact')
// router.use('/group')
// router.use('/order', orderRouter)
// router.use('/user', userRouter)
// router.use('/point')

export default router