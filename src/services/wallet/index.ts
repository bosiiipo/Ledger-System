import {NextFunction, Request, Response} from 'express';
// import * as WalletService from '../services/Wallet';
import {
  sendFailureResponse,
  sendSuccessResponse,
  StatusCode,
} from '../../responses';
import Wallet from '../../models/Wallet.model';
import { UnprocessableEntityException, ResourceNotFound, ValidationError } from '../../responses/errors';
import User from '../../models/User.model';

type CreateWallet = {
    userId: string;
    currency: string;
};

type TopUpWallet = {
  userId: string;
  walletId: string;
  amount: number;
};

class WalletService {
  async createWallet(input: CreateWallet) {
    const { userId, currency } = input;

    if(!["USD", "EUR", "NGN", "GBP"].includes(currency)){
        throw new ValidationError("Currency type not supported");
    }

    const existingWallet = await Wallet.findOne({ userId, currency });

    if (existingWallet){
        throw new UnprocessableEntityException("Account with this currency already exists!");
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

  async topUpWallet(input: TopUpWallet) {
    const { userId, walletId, amount } = input;

    const user = await User.findById(userId);

    if(!user) throw new ResourceNotFound("User with userId provided, not found!")

    const wallet = await Wallet.findOne({ userId, walletId });

    if (!wallet){
        throw new UnprocessableEntityException("Account with this id does not exist!");
    }

    const newBalance = await Wallet.findByIdAndUpdate(walletId, {
      availableBalance: wallet.availableBalance + amount
    }); 

    return newBalance;
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
