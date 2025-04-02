import request from 'supertest';
// import app from '../app'; // Assuming you have an Express app instance
import { walletService } from '../services/wallet';
import Wallet from '../models/Wallet.model';
import User from '../models/User.model';
import mongoose from 'mongoose';
import { config } from '../config';

jest.mock('../../models/Wallet.model');
jest.mock('../../models/User.model');

describe('WalletService', () => {
  beforeAll(async () => {
    await mongoose.connect(config.databaseUrl!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Create Wallet', () => {
    it('should create a wallet successfully', async () => {
      const user = { _id: 'user123', firstName: 'John', lastName: 'Doe' };
      jest.spyOn(User, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      } as any);
      jest.spyOn(Wallet, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);
      Wallet.prototype.save = jest.fn().mockResolvedValue({
        userId: user._id,
        currency: 'USD',
        accountName: `${user.firstName} ${user.lastName}`,
      });

      const response = await walletService.createWallet({ userId: 'user123', currency: 'USD' });
      expect(response).toHaveProperty('currency', 'USD');
    });

    it('should fail if the currency is not supported', async () => {
      await expect(walletService.createWallet({ userId: 'user123', currency: 'INR' })).rejects.toThrow('Currency type not supported');
    });
  });

  // describe('Top Up Wallet', () => {
  //   it('should top up a wallet successfully', async () => {
  //     const wallet = { _id: 'wallet123', availableBalance: 100, save: jest.fn() };
  //     jest.spyOn(Wallet, 'findById').mockReturnValue({
  //       exec: jest.fn().mockResolvedValue(wallet),
  //     } as any);
      
  //     jest.spyOn(Wallet, 'findByIdAndUpdate').mockReturnValue({
  //       exec: jest.fn().mockResolvedValue({ availableBalance: 200 }),
  //     } as any);

  //     const response = await walletService.topUpWallet({ userId: 'user123', walletId: 'wallet123', amount: 100 });
  //     expect(response?.availableBalance).toBe(200);
  //   });
  // });

  // describe('Send Money', () => {
  //   it('should send money successfully between wallets with the same currency', async () => {
  //     const senderWallet = { _id: 'wallet1', availableBalance: 500, currency: 'USD' };
  //     const recipientWallet = { _id: 'wallet2', availableBalance: 300, currency: 'USD' };
  //     jest.spyOn(Wallet, 'findById').mockReturnValue({
  //       exec: jest.fn().mockImplementation((id: string) => {
  //         if (id === 'wallet1') return Promise.resolve(senderWallet);
  //         if (id === 'wallet2') return Promise.resolve(recipientWallet);
  //         return Promise.resolve(null);
  //       }),
  //     } as any);
  //     jest.spyOn(Wallet, 'findByIdAndUpdate').mockReturnValue({
  //       exec: jest.fn().mockImplementation((id: string, update: { $inc: { availableBalance: number } }) => {
  //         if (id === 'wallet1') {
  //           return Promise.resolve({
  //             availableBalance: senderWallet.availableBalance - update.$inc.availableBalance,
  //           });
  //         }
  //         if (id === 'wallet2') {
  //           return Promise.resolve({
  //             availableBalance: recipientWallet.availableBalance + update.$inc.availableBalance,
  //           });
  //         }
  //         return Promise.resolve(null);
  //       }),
  //     } as any);
      
      
  //     await walletService.sendMoney({ userId: 'user123', senderWalletId: 'wallet1', recipientWalletId: 'wallet2', amount: 100, currency: 'USD' });
      
  //     expect(Wallet.findById).toHaveBeenCalledTimes(2);
  //   });
  // });

//   describe('Get Wallet By ID', () => {
//     it('should retrieve a wallet by ID', async () => {
//       const wallet = { _id: 'wallet123', userId: 'user123', currency: 'USD', availableBalance: 500 };
//       Wallet.findById.mockResolvedValue(wallet);

//       const response = await walletService.getWalletById({ WalletId: 'wallet123' });
//       expect(response.currency).toBe('USD');
//     });
//   });
});
