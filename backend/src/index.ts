import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Express } from "express";
import { authRouter } from "./routes/auth.routes";
import { flagsRouter } from "./routes/flags.routes";

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/flags", flagsRouter);

app
  .listen(PORT, (): void => console.log(`Server is running on port ${PORT}`))
  .on("error", (err: Error) => {
    console.error("Error starting server:", err);
  });
