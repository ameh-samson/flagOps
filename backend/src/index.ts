import express from "express";
import cors from "cors";
import type { Express } from "express";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, (): void => console.log(`Server is running on port ${PORT}`));
