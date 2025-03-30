import {Router} from 'express';
import {WalletController} from '../controllers/wallet.controller';
import AuthController from '../controllers/auth.controller';

export const router = Router();
const walletController = new WalletController();
const authController = new AuthController();

router.post('/create/:userId', authController.authorizeToken, walletController.createWallet); 

export default router;


