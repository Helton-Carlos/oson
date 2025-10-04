import express from "express";
import cors from "cors";
import { configDotenv } from 'dotenv';

import routes from "@routes/index";

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});