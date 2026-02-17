import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { envProduction } from "./src/utils/envProduction";

if (!envProduction.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the .env file");
}

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: envProduction.DATABASE_URL,
  },
});
