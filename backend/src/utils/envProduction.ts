import { StringValue } from "ms";

export const envProduction = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET_KEY as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as StringValue,
  FRONTEND_URL: process.env.FRONTEND_URL,
} as const;
