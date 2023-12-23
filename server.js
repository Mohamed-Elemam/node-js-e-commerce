import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { allRouters } from "./src/modules/index.routers.js";
app.use(cors());

const app = express();
const port = process.env.PORT;
app.use(express.json());

dbConnection();
allRouters(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
