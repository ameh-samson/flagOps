import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Express } from "express";
import { authRouter } from "./routes/auth.routes";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/v1/api/auth", authRouter);

app
  .listen(PORT, (): void => console.log(`Server is running on port ${PORT}`))
  .on("error", (err: Error) => {
    console.error("Error starting server:", err);
  });
