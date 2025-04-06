import {Router} from 'express';
import {AuthController} from '../controllers/auth.controller';
import {validate} from '../middlewares/validate';
import {CreateUserSchema} from '../validations/user.schema';
import {SignInSchema} from '../validations/auth.schema';

export const router = Router();
const authController = new AuthController();

router.post('/', validate(SignInSchema), authController.signIn);

router.post('/register', validate(CreateUserSchema), authController.createUser);

export default router;
