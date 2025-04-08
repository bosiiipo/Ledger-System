import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { config } from '../config';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import logger from '../lib/logger';

let mongoMockServer: MongoMemoryReplSet | null = null;

export const connectMongoose = async () => {
  try {
    let databaseURL = config.databaseUrl!;

    if (process.env.NODE_ENV === 'test') {
      mongoMockServer = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      databaseURL = mongoMockServer.getUri();
    }

    await mongoose.connect(databaseURL);
    logger.info('mongoose.js: Successfully connected to MongoDB!');
  } catch (error) {
    logger.error('mongoose.js: Connection error:', error);
  }
};

export const client = new MongoClient(config.databaseUrl!);
