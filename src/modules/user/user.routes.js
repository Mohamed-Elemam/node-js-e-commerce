import { Router } from "express";
const router = Router();
import * as userController from "./user.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";



//get all user
router.route("/")
.post(errorHandling(userController.signUp))
// .get(errorHandling(userController.getAllBrands))

router.route("/:_id")
.put(errorHandling(userController.updateUser)) //update user
.delete(errorHandling(userController.deleteUser)) //delete user

export default router;
