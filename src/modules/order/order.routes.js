import { Router } from "express";
const router = Router();
import * as ordertController from "./order.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from '../auth/auth.controller.js';



router.post("/:id",handleAuth,errorHandling(ordertController.createCashOrder))

router.get("/",handleAuth,errorHandling(ordertController.getUserOrders))


// router.get("/",handleAuth,errorHandling(ordertController.getAllUserordert))
export default router;
