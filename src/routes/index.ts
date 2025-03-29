import {Router} from 'express';
import authRoutes from './auth';

const router = Router();

// No auth required
router.use('/auth', authRoutes);

// Requires auth

export default router;
