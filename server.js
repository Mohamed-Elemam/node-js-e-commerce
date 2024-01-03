import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { allRouters } from "./src/modules/index.routers.js";
import { onlineWebhook } from "./src/modules/order/order.controller.js";

const app = express();
app.use(cors());
const port = process.env.PORT;
app.post("/webhook", express.raw({ type: "application/json" }), onlineWebhook);

app.listen(4242, () => console.log("Running on port 4242"));

app.use(express.json());

dbConnection();
allRouters(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
