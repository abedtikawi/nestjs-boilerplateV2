export enum NODE_ENV {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  TESTING = 'testing',
}
export const DEV_ENV = [
  NODE_ENV.DEVELOPMENT,
  NODE_ENV.STAGING,
  NODE_ENV.TESTING,
];
export const CUSTOM_VERSIONING_FIELD = 'version';
