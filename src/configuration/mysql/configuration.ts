import { registerAs } from '@nestjs/config';

export default registerAs('db_mysql', () => ({
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  readerHost: process.env.DB_READERHOST,
  writerHost: process.env.DB_WRITERHOST,
}));
