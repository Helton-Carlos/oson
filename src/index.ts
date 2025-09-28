import express from "express";
import cors from "cors";
import routes from "@routes/index";

import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});