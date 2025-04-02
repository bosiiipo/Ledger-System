import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
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
declare class WalletService {
    private client;
    constructor(client: MongoClient);
    createWallet(input: CreateWallet): Promise<mongoose.Document<unknown, {}, import("../../models/Wallet.model").IWallet> & import("../../models/Wallet.model").IWallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    topUpWallet(input: TopUpWallet): Promise<(mongoose.Document<unknown, {}, import("../../models/Wallet.model").IWallet> & import("../../models/Wallet.model").IWallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    sendMoney(input: SendMoney): Promise<void>;
    getWalletById(input: {
        walletId: string;
    }): Promise<(mongoose.Document<unknown, {}, import("../../models/Wallet.model").IWallet> & import("../../models/Wallet.model").IWallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
export declare const walletService: WalletService;
export {};
