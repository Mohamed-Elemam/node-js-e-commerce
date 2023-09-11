import { Router } from "express";
const router = Router();
import * as wishlistController from "./wishlist.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from './../auth/auth.controller.js';



router.post("/",handleAuth,errorHandling(wishlistController.addToWishlist))

router.get("/",handleAuth,errorHandling(wishlistController.getAllUserwishlist))

router.patch("/:_id",handleAuth,errorHandling(wishlistController.removeFromWishlist))

export default router;
