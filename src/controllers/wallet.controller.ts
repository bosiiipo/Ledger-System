import {NextFunction, Request, Response} from 'express';
import {walletService} from '../services/wallet';
import {sendSuccessResponse, StatusCode} from '../responses';

export class WalletController {
  async createWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        userId: req.params.userId,
        currency: req.body.currency,
      };

      const response = await walletService.createWallet(params);

      return sendSuccessResponse(
        res,
        StatusCode.CREATED,
        'Wallet created successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async topUpWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        userId: req.params.userId,
        walletId: req.params.walletId,
        amount: req.body.amount,
      };

      const response = await walletService.topUpWallet(params);

      return sendSuccessResponse(
        res,
        StatusCode.OK,
        'Wallet topped up successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async getWallets(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        userId: req.params.userId,
      };

      const response = await walletService.getWallets(params);

      return sendSuccessResponse(
        res,
        StatusCode.OK,
        'Wallets fetched successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async sendMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        userId: req.body.userId,
        senderWalletId: req.body.senderWalletId,
        recipientWalletId: req.body.recipientWalletId,
        currency: req.body.currency,
        amount: req.body.amount,
      };

      const response = await walletService.sendMoney(params);

      return sendSuccessResponse(
        res,
        StatusCode.CREATED,
        'Transaction successful',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async getWalletById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        walletId: req.params.WalletId,
      };

      const response = await walletService.getWalletById(params);

      return sendSuccessResponse(
        res,
        StatusCode.OK,
        'Wallet fetched successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }
}
