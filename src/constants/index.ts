export enum EnvVar {
  Port = 'PORT',
  NodeEnv = 'NODE_ENV',
  CryptoSecret = 'CRYPTO_SECRET',
  ClientBaseUrl = 'CLIENT_BASE_URL',
  SendGridApiKey = 'SENDGRID_API_KEY',
  UrlMetaAuthString = 'URL_META_AUTH_STRING',
  LambdaSendEmailEndpoint = 'LAMBDA_SEND_EMAIL_ENDPOINT',
}

export enum NodeEnv {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
}

export { UrlMeta } from './UrlMeta';
export { UserStatus } from './User';
export * from './Link';
export * from './PrismaErrorCode';
