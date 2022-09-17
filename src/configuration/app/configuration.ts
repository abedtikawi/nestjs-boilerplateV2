import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  logLevel: process.env.LOG_LEVEL,
  appToken: process.env.APP_TOKEN,
  refreshToken: process.env.APP_REFRESH_TOKEN,
  baseURL: process.env.BASE_URL,
  versionType: process.env.VERSION_TYPE,
}));
