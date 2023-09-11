import { Router } from "express";
const router = Router();
import * as wishlistController from "./wishlist.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from './../auth/auth.controller.js';



router.route("/")
.post(handleAuth,errorHandling(wishlistController.addToWishlist))

router.route("/:_id")
.patch(handleAuth,errorHandling(wishlistController.removeFromWishlist))

export default router;
