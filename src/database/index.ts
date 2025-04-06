import mongoose, { ClientSession, Connection } from 'mongoose';
import {MongoClient} from 'mongodb';
import {config} from '../config';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectMongoose = async () => {
  try {
    let mongoMockServer = await MongoMemoryServer.create();
    const uri = mongoMockServer.getUri();
    let databaseURL = process.env.NODE_ENV !== "test" ? config.databaseUrl! : uri; 
    await mongoose.connect(databaseURL);
    console.log('mongoose.js: ' + 'Successfully connected to mongo database!!');
  } catch (error) {
    console.log(error);
  }
};

export const client = new MongoClient(config.databaseUrl!);



