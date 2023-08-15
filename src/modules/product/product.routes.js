import { Router } from "express";
import * as productControl from "./product.controller.js";
import { errorHandling } from "../../../utils/errorHandling.js";
const productRouter = Router();


//add sub category
productRouter.route("/:categoryId")
.post(errorHandling(productControl.addproduct))

//get all sub category
productRouter.route("/")
.get(errorHandling(productControl.getAllProducts))

productRouter.route("/:_id")
.put(errorHandling(productControl.updateproduct)) 
.delete(errorHandling(productControl.deleteproduct)) 

export default productRouter;
