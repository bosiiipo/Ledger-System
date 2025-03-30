import {NextFunction, Request, Response} from 'express';
import {walletService} from '../services/wallet';
import {
  sendFailureResponse,
  sendSuccessResponse,
  StatusCode,
} from '../responses';

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
        amount: req.body.amount
      };

      const response = await walletService.topUpWallet(params);
      
      return sendSuccessResponse(
        res,
        StatusCode.CREATED,
        'Wallet topped up successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async getWalletById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = {
        WalletId: req.params.WalletId
      }

      const response = await WalletService.getWalletById(params);
      
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
