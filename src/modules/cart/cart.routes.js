import { Router } from "express";
const router = Router();
import * as cartController from "./cart.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";



router.route("/")
.post(errorHandling(cartController.addToCart))

router.route("/:_id")
.delete(errorHandling(cartController.removeFromCart)) 

export default router;
