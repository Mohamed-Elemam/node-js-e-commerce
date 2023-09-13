import { Router } from "express";
const router = Router();
import * as reviewController from "./review.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { handleAuth } from '../auth/auth.controller.js';


router
    .post("/",handleAuth,errorHandling(reviewController.addReview))
    //delete review
    .delete("/:reviewId",handleAuth,errorHandling(reviewController.deleteReview))
    //update review
    .put("/:reviewId",handleAuth,errorHandling(reviewController.updateReview))
    .get("/:reviewId",handleAuth,errorHandling(reviewController.getReviewById))

//get user reviews
router.get("/",handleAuth,errorHandling(reviewController.getAllUserReviews))
export default router;
