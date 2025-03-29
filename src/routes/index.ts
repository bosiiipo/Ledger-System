import {Router} from 'express';
import authRoutes from './auth';
import userRoutes from './user';

const router = Router();

// No auth required
router.use('/auth', authRoutes);

// Requires auth
router.use('/user', userRoutes);

export default router;
