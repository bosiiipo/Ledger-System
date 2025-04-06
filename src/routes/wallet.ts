import {Router} from 'express';
import {WalletController} from '../controllers/wallet.controller';
import AuthController from '../controllers/auth.controller';

export const router = Router();
const walletController = new WalletController();
const authController = new AuthController();

router.post(
  '/create/:userId',
  authController.authorizeToken,
  walletController.createWallet
);
router.get(
  '/:userId',
  authController.authorizeToken,
  walletController.getWallets
);
router.post(
  '/:walletId/user/:userId/',
  authController.authorizeToken,
  walletController.topUpWallet
);
router.post('/send', authController.authorizeToken, walletController.sendMoney);

export default router;
