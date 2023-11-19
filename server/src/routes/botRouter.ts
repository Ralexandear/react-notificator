import { Router } from "express";
const router = Router();
import botController from "../controllers/botController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

router.post('/create', checkRoleMiddleware('ADMIN'), botController.create)
router.get('/list', checkRoleMiddleware('ADMIN'), botController.getList)
router.delete('/delete', checkRoleMiddleware('ADMIN'), botController.delete)

export default router