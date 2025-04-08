import {Router} from 'express';
import {UserController} from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { GetUserSchema } from '../validations/user.schema';

export const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.get(
  '/:userId',
  authController.authorizeToken,
  validate(GetUserSchema),
  userController.getUserById
);

export default router;
