import mongoose, { Document } from "mongoose";
export interface IWallet extends Document {
    userId: mongoose.Types.ObjectId;
    availableBalance: number;
    currency: string;
    accountName: string;
}
declare const Wallet: mongoose.Model<IWallet, {}, {}, {}, mongoose.Document<unknown, {}, IWallet> & IWallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Wallet;
