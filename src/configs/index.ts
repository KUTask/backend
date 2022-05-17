export enum EnviormentVariables {
  JWT_PUBLIC_KEY = 'JWT_PUBLIC_KEY',
  JWT_PRIVATE_KEY = 'JWT_PRIVATE_KEY',
  COOKIE_SECRET = 'COOKIE_SECRET',
  MONGO_URI = 'MONGO_URI',
}

export default () => ({
  [EnviormentVariables.COOKIE_SECRET]:
    process.env[EnviormentVariables.COOKIE_SECRET],
  [EnviormentVariables.MONGO_URI]: process.env[EnviormentVariables.MONGO_URI],
})
