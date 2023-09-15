import { Router } from "express";
const router = Router();
import * as cartController from "./cart.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from "../auth/auth.controller.js";

router.route("/")
.post(handleAuth, errorHandling(cartController.addToCart))
.get(handleAuth,errorHandling(cartController.loggedUserCart))
.patch(handleAuth,errorHandling(cartController.updateProductQuantity)) 

router.route("/:_id")
.delete(handleAuth,errorHandling(cartController.removeFromCart)) 

export default router;
