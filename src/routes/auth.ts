import {Router} from 'express';
import {AuthController} from '../controllers/auth.controller';
import {UserController} from '../controllers/user.controller';
import {validate} from '../middlewares/validate'
import { CreateUserSchema } from '../validations/user.schema';

export const router = Router();
const authController = new AuthController();
const userController = new UserController();


router.post('/', authController.getSignedToken);

router.post('/register', validate(CreateUserSchema), userController.createUser);


export default router;


