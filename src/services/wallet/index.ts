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
import { client } from '../../database';
import { isNumberObject } from 'util/types';
import UserTransactionLog from '../../models/UserTransactionLog';
import mongoose from 'mongoose';
import {ClientSession, MongoClient} from 'mongodb';

type CreateWallet = {
    userId: string;
    currency: string;
};

type TopUpWallet = {
  userId: string;
  walletId: string;
  amount: number;
};

type SendMoney = {
  userId: string;
  senderWalletId: string;
  recipientWalletId: string;
  amount: number;
  currency: string;
};

class WalletService {
  private client: MongoClient;

  constructor(client: MongoClient) {
    this.client = client;
  }

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

    const wallet = await Wallet.findById(walletId);

    if (!wallet){
        throw new UnprocessableEntityException("Account with this id does not exist!");
    }

    const newBalance = await Wallet.findByIdAndUpdate(walletId, {
      $inc: { availableBalance: amount }},
      {new: true}
    ); 

    return newBalance;
  }

  async sendMoney(input: SendMoney) {
    const { userId, senderWalletId, amount, currency, recipientWalletId } = input;

    if (!["NGN", "GBP", "EUR", "USD"].includes(currency)) {
      throw new Error("Currency not supported!");
    }

    await this.client.connect();
    const session: ClientSession = await mongoose.startSession();

    try {
      session.startTransaction();

      const sourceWallet = await Wallet.findById(senderWalletId).session(session);
      if (!sourceWallet) throw new ResourceNotFound("Source wallet not found!");

      const recipientWallet = await Wallet.findById(recipientWalletId).session(session);
      if (!recipientWallet) throw new ResourceNotFound("Recipient wallet not found!");

      if (sourceWallet.availableBalance < amount) throw new Error("Insufficient funds!");
      if (sourceWallet.currency !== recipientWallet.currency) throw new Error("Transfers can only be made between accounts with the same currency!");

      let sourceBalanceBefore = sourceWallet.availableBalance;
      let recipientBalanceBefore = recipientWallet.availableBalance;

      const newSource = await Wallet.findByIdAndUpdate(
        senderWalletId,
        { $inc: { availableBalance: -amount } },
        { new: true, session }
      );

      const newRecipient = await Wallet.findByIdAndUpdate(
        recipientWalletId,
        { $inc: { availableBalance: amount } },
        { new: true, session }
      );

      const sourceTransactionReceipt = new UserTransactionLog({
        userId,
        balanceBefore: sourceBalanceBefore,
        amount,
        balanceAfter: newSource?.availableBalance,
        status: "successful",
        transactionType: "Debit",
        currency,
        referenceId: new mongoose.Types.ObjectId(),
        walletId: new mongoose.Types.ObjectId(senderWalletId),
        recipientWalletId: new mongoose.Types.ObjectId(recipientWalletId),
      });

      const recipientTransactionReceipt = new UserTransactionLog({
        userId: recipientWallet.userId,
        balanceBefore: recipientBalanceBefore,
        amount,
        balanceAfter: newRecipient?.availableBalance,
        status: "successful",
        transactionType: "Credit",
        currency,
        referenceId: new mongoose.Types.ObjectId(),
        walletId: new mongoose.Types.ObjectId(recipientWalletId),
        recipientWalletId: new mongoose.Types.ObjectId(senderWalletId),
      });

      await sourceTransactionReceipt.save({ session });
      await recipientTransactionReceipt.save({ session });

      await session.commitTransaction();
      console.log("Transaction Successful");

    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction Failed", error);
      // console.log({stack: error.stack});
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getWalletById(input: {walletId: string}) {
    return await Wallet.findById(input.walletId);
  }
}

export const walletService = new WalletService(client);
