import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';
import {config} from '../config';
import {MongoMemoryReplSet} from 'mongodb-memory-server';

export const connectMongoose = async () => {
  try {
    const mongoMockServer = await MongoMemoryReplSet.create({replSet: { count: 1 }});
    const uri = mongoMockServer.getUri();
    const databaseURL =
      process.env.NODE_ENV !== 'test' ? config.databaseUrl! : uri;
    await mongoose.connect(databaseURL);
    console.log('mongoose.js: ' + 'Successfully connected to mongo database!!');
  } catch (error) {
    console.log(error);
  }
};

export const client = new MongoClient(config.databaseUrl!);
