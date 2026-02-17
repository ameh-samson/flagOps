import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { envProduction } from "../utils/envProduction.js";

const sql = neon(envProduction.DATABASE_URL!);
export const db = drizzle(sql);
