import mongoose, { ClientSession, Connection } from 'mongoose';
import {MongoClient} from 'mongodb';
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

export const client = new MongoClient(config.databaseUrl!);



