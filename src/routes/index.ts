import {Router} from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import walletRoutes from './wallet';

const router = Router();

// No auth required
router.use('/auth', authRoutes);

// Requires auth
router.use('/user', userRoutes);
router.use('/wallet', walletRoutes);

export default router;
