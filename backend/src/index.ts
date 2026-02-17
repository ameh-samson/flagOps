import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Express } from "express";
import { authRouter } from "./routes/auth.routes.js";
import { flagsRouter } from "./routes/flags.routes.js";
import { evaluateRouter } from "./routes/evaluate.routes.js";
import { envProduction } from "./utils/envProduction.js";

const app: Express = express();
const PORT = envProduction.PORT;

app.use(express.json());
app.use(cors({
  origin: envProduction.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/flags", flagsRouter);
app.use("/v1/api/evaluate", evaluateRouter);

if (process.env.NODE_ENV !== 'production') {
  app
    .listen(PORT, (): void => console.log(`Server is running on port ${PORT}`))
    .on("error", (err: Error) => {
      console.error("Error starting server:", err);
    });
}

export default app;
