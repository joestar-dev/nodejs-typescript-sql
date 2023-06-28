import dotenv from "dotenv";

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,

  password: process.env.DB_PASSWORD as string,

  database: process.env.DB_NAME as string,

  // driver: 'msnodesqlv8',

  server: "localhost",

  // port: 1433,
  pool: {
    max: 10,

    min: 0,

    idleTimeoutMillis: 30000,
    // idleTimeoutMillis: 3600000,
    // connectionTimeout: 3600000,
    // requestTimeout: 3600000,
  },

  options: {
    encrypt: true,
    // useUTC: true,
    // port: 1433,
    trustServerCertificate: true,
  },
};