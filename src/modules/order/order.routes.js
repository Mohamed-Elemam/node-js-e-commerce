import { Router } from "express";
const router = Router();
import * as orderController from "./order.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";

router.post("/:id", handleAuth, errorHandling(orderController.createCashOrder));

router.get("/", handleAuth, errorHandling(orderController.getUserOrders));

// router.get("/",handleAuth,errorHandling(ordertController.getAllUserordert))
export default router;
