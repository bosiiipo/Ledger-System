"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const wallet_1 = require("../services/wallet");
const responses_1 = require("../responses");
class WalletController {
    async createWallet(req, res, next) {
        try {
            const params = {
                userId: req.params.userId,
                currency: req.body.currency,
            };
            const response = await wallet_1.walletService.createWallet(params);
            return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.CREATED, 'Wallet created successfully', response);
        }
        catch (error) {
            return next(error);
        }
    }
    async topUpWallet(req, res, next) {
        try {
            const params = {
                userId: req.params.userId,
                walletId: req.params.walletId,
                amount: req.body.amount
            };
            const response = await wallet_1.walletService.topUpWallet(params);
            return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.CREATED, 'Wallet topped up successfully', response);
        }
        catch (error) {
            return next(error);
        }
    }
    async sendMoney(req, res, next) {
        try {
            const params = {
                userId: req.body.userId,
                senderWalletId: req.body.senderWalletId,
                recipientWalletId: req.body.recipientWalletId,
                currency: req.body.currency,
                amount: req.body.amount
            };
            const response = await wallet_1.walletService.sendMoney(params);
            return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.CREATED, 'Transaction successful', response);
        }
        catch (error) {
            return next(error);
        }
    }
    async getWalletById(req, res, next) {
        try {
            const params = {
                walletId: req.params.WalletId
            };
            const response = await wallet_1.walletService.getWalletById(params);
            return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.OK, 'Wallet fetched successfully', response);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map