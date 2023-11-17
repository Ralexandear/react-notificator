import { Router } from "express";
const router = Router();
//import botRouter from './botRouter';
import userRouter from './userRouter'
import orderTypeRouter from './orderTypeRouter'

// router.use('/bot')
// router.use('/contact')
// router.use('/group')
// router.use('/order')
router.use('/order/type', orderTypeRouter)
router.use('/user', userRouter)
// router.use('/point')

export default router