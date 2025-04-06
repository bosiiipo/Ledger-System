import mongoose, {Document, Schema} from "mongoose";

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
    recipientWalletId: mongoose.Types.ObjectId; // Optional for non-transfer transactions
}

const UserTransactionLogSchema: Schema<IUserTransactionLog> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balanceBefore: {
        type: Number,
        required: true,
        min: 0,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    balanceAfter: {
        type: Number,
        required: true,
        min: 0,
    },
    transactionType: {
        type: String,
        enum: ["Credit", "Debit"],
        required: true,
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "NGN", "GBP"],
        default: "NGN",
        required: true,
    },
    status: {
        type: String,
        enum: ["successful", "failed", "pending"],
        required: true,
    },
    referenceId: {
        type: String,
        unique: true
    },
    walletId: {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
    },
    recipientWalletId: {
        type: Schema.Types.ObjectId,
        ref: "Wallet"
    }
},
{timestamps: true}
);

const UserTransactionLog = mongoose.model<IUserTransactionLog>('UserTransactionLog', UserTransactionLogSchema);

export default UserTransactionLog;