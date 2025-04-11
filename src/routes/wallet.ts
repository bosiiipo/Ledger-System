import {Router} from 'express';
import {WalletController} from '../controllers/wallet.controller';
import AuthController from '../controllers/auth.controller';
import {
  CreateWalletSchema,
  SendMoneySchema,
  TopUpWalletSchema,
} from '../validations/wallet.schema';
import {validate} from '../middlewares/validate';

export const router = Router();
const walletController = new WalletController();
const authController = new AuthController();

router.post(
  '/create/:userId',
  authController.authorizeToken,
  validate(CreateWalletSchema),
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
  validate(TopUpWalletSchema),
  walletController.topUpWallet
);
router.post(
  '/send',
  authController.authorizeToken,
  validate(SendMoneySchema),
  walletController.sendMoney
);

export default router;
