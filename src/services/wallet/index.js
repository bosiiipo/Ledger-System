"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletService = void 0;
const Wallet_model_1 = __importDefault(require("../../models/Wallet.model"));
const errors_1 = require("../../responses/errors");
const User_model_1 = __importDefault(require("../../models/User.model"));
const database_1 = require("../../database");
const UserTransactionLog_1 = __importDefault(require("../../models/UserTransactionLog"));
const mongoose_1 = __importDefault(require("mongoose"));
class WalletService {
    constructor(client) {
        this.client = client;
    }
    async createWallet(input) {
        const { userId, currency } = input;
        if (!["USD", "EUR", "NGN", "GBP"].includes(currency)) {
            throw new errors_1.ValidationError("Currency type not supported");
        }
        const existingWallet = await Wallet_model_1.default.findOne({ userId, currency });
        if (existingWallet) {
            throw new errors_1.UnprocessableEntityException("Account with this currency already exists!");
        }
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new errors_1.ResourceNotFound("User with userId provided, not found!");
        const newWallet = new Wallet_model_1.default({
            userId,
            currency,
            accountName: `${user === null || user === void 0 ? void 0 : user.firstName} ${user.lastName}`
        });
        await newWallet.save();
        return newWallet;
    }
    async topUpWallet(input) {
        const { userId, walletId, amount } = input;
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new errors_1.ResourceNotFound("User with userId provided, not found!");
        const wallet = await Wallet_model_1.default.findById(walletId);
        if (!wallet) {
            throw new errors_1.UnprocessableEntityException("Account with this id does not exist!");
        }
        const newBalance = await Wallet_model_1.default.findByIdAndUpdate(walletId, {
            $inc: { availableBalance: amount }
        }, { new: true });
        return newBalance;
    }
    async sendMoney(input) {
        const { userId, senderWalletId, amount, currency, recipientWalletId } = input;
        if (!["NGN", "GBP", "EUR", "USD"].includes(currency)) {
            throw new Error("Currency not supported!");
        }
        await this.client.connect();
        const session = await mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const sourceWallet = await Wallet_model_1.default.findById(senderWalletId).session(session);
            if (!sourceWallet)
                throw new errors_1.ResourceNotFound("Source wallet not found!");
            const recipientWallet = await Wallet_model_1.default.findById(recipientWalletId).session(session);
            if (!recipientWallet)
                throw new errors_1.ResourceNotFound("Recipient wallet not found!");
            if (sourceWallet.availableBalance < amount)
                throw new Error("Insufficient funds!");
            if (sourceWallet.currency !== recipientWallet.currency)
                throw new Error("Transfers can only be made between accounts with the same currency!");
            let sourceBalanceBefore = sourceWallet.availableBalance;
            let recipientBalanceBefore = recipientWallet.availableBalance;
            const newSource = await Wallet_model_1.default.findByIdAndUpdate(senderWalletId, { $inc: { availableBalance: -amount } }, { new: true, session });
            const newRecipient = await Wallet_model_1.default.findByIdAndUpdate(recipientWalletId, { $inc: { availableBalance: amount } }, { new: true, session });
            const sourceTransactionReceipt = new UserTransactionLog_1.default({
                userId,
                balanceBefore: sourceBalanceBefore,
                amount,
                balanceAfter: newSource === null || newSource === void 0 ? void 0 : newSource.availableBalance,
                status: "successful",
                transactionType: "Debit",
                currency,
                referenceId: new mongoose_1.default.Types.ObjectId(),
                walletId: new mongoose_1.default.Types.ObjectId(senderWalletId),
                recipientWalletId: new mongoose_1.default.Types.ObjectId(recipientWalletId),
            });
            const recipientTransactionReceipt = new UserTransactionLog_1.default({
                userId: recipientWallet.userId,
                balanceBefore: recipientBalanceBefore,
                amount,
                balanceAfter: newRecipient === null || newRecipient === void 0 ? void 0 : newRecipient.availableBalance,
                status: "successful",
                transactionType: "Credit",
                currency,
                referenceId: new mongoose_1.default.Types.ObjectId(),
                walletId: new mongoose_1.default.Types.ObjectId(recipientWalletId),
                recipientWalletId: new mongoose_1.default.Types.ObjectId(senderWalletId),
            });
            await sourceTransactionReceipt.save({ session });
            await recipientTransactionReceipt.save({ session });
            await session.commitTransaction();
            console.log("Transaction Successful");
        }
        catch (error) {
            await session.abortTransaction();
            console.error("Transaction Failed", error);
            // console.log({stack: error.stack});
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async getWalletById(input) {
        return await Wallet_model_1.default.findById(input.walletId);
    }
}
exports.walletService = new WalletService(database_1.client);
//# sourceMappingURL=index.js.map