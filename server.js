import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { allRouters } from "./src/modules/index.routers.js";
import { onlineWebhook } from "./src/modules/order/order.controller.js";
import path from "path";

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/webhook", express.raw({ type: "application/json" }), onlineWebhook);
app.use(cors());
app.use(express.json());

dbConnection();
allRouters(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
