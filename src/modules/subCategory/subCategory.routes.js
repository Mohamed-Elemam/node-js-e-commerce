import { Router } from "express";
const router = Router();
import * as subCategoryControl from "./subCategory.controller.js";
import { errorHandling } from "./../../../utils/errorHandling.js";


//add sub category
router.route("/:categoryId")
.post(errorHandling(subCategoryControl.addSubCategory))

//get all sub category
router.route("/")
.get(errorHandling(subCategoryControl.getAllSubCategories))

router.route("/:_id")
.put(errorHandling(subCategoryControl.updateSubCategory)) //update sub category
.delete(errorHandling(subCategoryControl.deleteSubCategory)) //delete sub category

export default router;
