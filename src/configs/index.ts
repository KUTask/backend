export enum EnviormentVariables {
  JWT_PUBLIC_KEY = 'JWT_PUBLIC_KEY',
  JWT_PRIVATE_KEY = 'JWT_PRIVATE_KEY',
  COOKIE_SECRET = 'COOKIE_SECRET',
  FIREBASE_CLIENT_EMAIL = 'FIREBASE_CLIENT_EMAIL',
  FIREBASE_PRIVATE_KEY = 'FIREBASE_PRIVATE_KEY',
  FIREBASE_PROJECT_ID = 'FIREBASE_PROJECT_ID',
}

export default () => ({
  [EnviormentVariables.JWT_PUBLIC_KEY]:
    process.env[EnviormentVariables.JWT_PUBLIC_KEY],
  [EnviormentVariables.JWT_PRIVATE_KEY]:
    process.env[EnviormentVariables.JWT_PRIVATE_KEY],
  [EnviormentVariables.COOKIE_SECRET]:
    process.env[EnviormentVariables.COOKIE_SECRET],
  [EnviormentVariables.FIREBASE_CLIENT_EMAIL]:
    process.env[EnviormentVariables.FIREBASE_CLIENT_EMAIL],
  [EnviormentVariables.FIREBASE_PRIVATE_KEY]:
    process.env[EnviormentVariables.FIREBASE_PRIVATE_KEY],
  [EnviormentVariables.FIREBASE_PROJECT_ID]:
    process.env[EnviormentVariables.FIREBASE_PROJECT_ID],
})
