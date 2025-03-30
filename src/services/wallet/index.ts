import {NextFunction, Request, Response} from 'express';
// import * as WalletService from '../services/Wallet';
import {
  sendFailureResponse,
  sendSuccessResponse,
  StatusCode,
} from '../../responses';
import Wallet from '../../models/Wallet.model';
import { ResourceExists, ResourceNotFound, ValidationError } from '../../responses/errors';
import User from '../../models/User.model';

type CreateWallet = {
    userId: string;
    currency: string;
};

class WalletService {
  async createWallet(input: CreateWallet) {
    const { userId, currency } = input;

    if(!["USD", "EUR", "NGN", "GBP"].includes(currency)){
        throw new ValidationError("Currency type not supported");
    }

    const existingWallet = await Wallet.findOne({ userId, currency });

    if (existingWallet){
        throw new ResourceExists("Account with this currency already exists!");
    }

    const user = await User.findById(userId);

    if(!user) throw new ResourceNotFound("User with userId provided, not found!")

    const newWallet = new Wallet({
        userId,
        currency,
        accountName: `${user?.firstName} ${user.lastName}`
    });
    
    await newWallet.save();

    return newWallet;
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

export const walletService = new WalletService();
