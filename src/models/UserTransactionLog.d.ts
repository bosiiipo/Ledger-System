import mongoose, { Document } from "mongoose";
export interface IUserTransactionLog extends Document {
    userId: mongoose.Types.ObjectId;
    balanceBefore: number;
    amount: number;
    balanceAfter: number;
    status: "successful" | "failed" | "pending";
    transactionType: "Credit" | "Debit";
    currency: "USD" | "EUR" | "NGN" | "GBP";
    referenceId: string;
    walletId: mongoose.Types.ObjectId;
    recipientWalletId: mongoose.Types.ObjectId;
}
declare const UserTransactionLog: mongoose.Model<IUserTransactionLog, {}, {}, {}, mongoose.Document<unknown, {}, IUserTransactionLog> & IUserTransactionLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default UserTransactionLog;
