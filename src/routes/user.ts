import {Router} from 'express';
import {UserController} from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';

export const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.get('/:userId', authController.authorizeToken, userController.getUserById); 

export default router;


