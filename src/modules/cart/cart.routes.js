import { Router } from "express";
const router = Router();
import * as cartController from "./cart.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";

router
  .route("/")
  .post(handleAuth, errorHandling(cartController.addToCart))
  .patch(handleAuth, errorHandling(cartController.updateProductQuantity));

router
  .route("/:_id")
  .get(handleAuth, errorHandling(cartController.loggedUserCart))
  .delete(handleAuth, errorHandling(cartController.removeFromCart));

router.post(
  "/applyCoupon/:couponCode",
  handleAuth,
  errorHandling(cartController.applyCoupon)
);

export default router;
