import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 9001,
  secret: process.env.SECRET
};
