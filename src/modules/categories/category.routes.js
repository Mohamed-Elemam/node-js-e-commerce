import { Router } from "express";
const router = Router();
import * as categoryControl from "./category.controller.js";
import { errorHandling } from "./../../../utils/errorHandling.js";

router.route("/")
.post(errorHandling(categoryControl.addCategory))
.get(errorHandling(categoryControl.getAllCategories))

router.route("/:_id")
.put(errorHandling(categoryControl.updateCategory))
.delete(errorHandling(categoryControl.deleteCategory))

export default router;
