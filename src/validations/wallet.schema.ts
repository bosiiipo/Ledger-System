import * as yup from 'yup';

const supportedCurrencies = ['GBP', 'EUR', 'USD', 'NGN'];

export const CreateWalletSchema = yup.object({
  currency: yup
    .string()
    .required('Currency is required')
    .oneOf(supportedCurrencies, 'Unsupported currency'),
});

export const TopUpWalletSchema = yup.object({
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});

export const SendMoneySchema = yup.object({
  userId: yup.string().required('User ID is required'),
  senderWalletId: yup.string().required('Sender wallet ID is required'),
  recipientWalletId: yup.string().required('Recipient wallet ID is required'),
  currency: yup
    .string()
    .required('Currency is required')
    .oneOf(supportedCurrencies, 'Unsupported currency'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});
