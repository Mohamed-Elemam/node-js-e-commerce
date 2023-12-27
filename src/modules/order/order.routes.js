import { Router } from "express";
const router = Router();
import * as orderController from "./order.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";

router.post(
  "/cashOrder/:id",
  handleAuth,
  errorHandling(orderController.createCashOrder)
);
router.post(
  "/checkout/:cartId",
  handleAuth,
  errorHandling(orderController.checkoutOrder)
);

router.get("/", handleAuth, errorHandling(orderController.getUserOrders));

// router.get("/",handleAuth,errorHandling(orderController.getAllUserorder))

export default router;
