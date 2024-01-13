import { Router } from "express";
const router = Router();
import * as orderController from "./order.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";
import { cartModel } from "../../../database/models/cart.model.js";

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
//*************************** */
router.get("/success/:cartId", async (req, res) => {
  const { cartId } = req.params;
  await cartModel.findByIdAndDelete(cartId);

  res.render("purchaseComplete", { redirectUrl: "http://localhost:5173/cart" });
});

export default router;
