import mongoose, { ClientSession, Connection } from 'mongoose';
import { InternalError, UnprocessableEntityException } from '../responses/errors';
import {config} from '../config';

export const connectMongoose = async () => {
  try {
    await mongoose.connect(config.databaseUrl!);
    console.log('mongoose.js: ' + 'Successfully connected to mongo database!!');
  } catch (error) {
    console.log(error);
  }
};

const maxWriteConflictRetry = 2;
let retry = 0;

export const dbTransaction = async <T>(
  connection: Connection,
  cb: (session: ClientSession) => Promise<T>,
): Promise<T> => {
  const session = await connection.startSession();
  try {
    session.startTransaction();
    const result = await cb(session);
    await session.commitTransaction();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    console.error('db_transaction_error', JSON.stringify(err));
    if (err instanceof mongoose.mongo.MongoError) {
      switch (err.code) {
        case 8: //unknown error
        case 112: //WriteConflict
        case 117: {
          //ConflictingOperationInProgress
          //retying for write conflicts and unknown errors
          if (retry <= maxWriteConflictRetry) {
            ++retry;
            console.error('db_transaction_error_retry');
            return dbTransaction(connection, cb);
          }
          throw new UnprocessableEntityException('Unable to process transaction, please try again');
        }

        case 11000: {
          //unique constraint error
          throw new UnprocessableEntityException(
            'Duplicate reference detected, please try again with a new reference',
          );
        }
        //unexpected error, client to treat as pending
        default: {
          throw new InternalError('Unexpected error occurred', err);
        }
      }
    }

    throw err;
  } finally {
    await session.endSession();
  }
};


