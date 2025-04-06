import mongoose, {Document, Schema} from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  availableBalance: number;
  currency: string;
  accountName: string;
}

const WalletSchema: Schema<IWallet> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    availableBalance: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'NGN', 'GBP'],
      default: 'NGN',
    },
  },
  {timestamps: true}
);

const Wallet = mongoose.model<IWallet>('Wallet', WalletSchema);

export default Wallet;
