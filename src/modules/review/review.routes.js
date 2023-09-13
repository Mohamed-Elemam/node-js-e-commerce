import { Router } from "express";
const router = Router();
import * as reviewController from "./review.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from '../auth/auth.controller.js';


//add review
router.post("/:productId",handleAuth,errorHandling(reviewController.addReview))
//delete review
router.delete("/:productId",handleAuth,errorHandling(reviewController.deleteReview))
//update review
router.put("/:productId",handleAuth,errorHandling(reviewController.updateReview))

//get user reviews
router.get("/",handleAuth,errorHandling(reviewController.getAllUserReviews))
export default router;
