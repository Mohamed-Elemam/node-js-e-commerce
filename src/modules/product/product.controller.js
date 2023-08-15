import slugify from "slugify";
import { categoriesModel } from "../../../database/models/categories.model.js";
import { productModel } from "../../../database/models/product.model .js";

//*------------
//*1--add prodduct
//*------------
const addproduct = async (req, res, next) => {
  const {categoryId}= req.params
  const { name } = req.body;
  req.body[slug]= slugify(req.body.title)
  const category = await categoriesModel.findById(categoryId);
  
  !category&&res.status(400).json({ message: "Category deoesnt exist" });


  //*subcategory check
  // const isExist = await productModel.findOne({ name });
  // isExist && res.status(400).json({ message: "product already exist" });

  const newproduct = new productModel({  });
  await newproduct.save();

  res.status(201).json({ message: "product add seccessfully", newproduct });
};

//*------------
//*2--update product
//*------------
const updateproduct = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const product = await productModel.findByIdAndUpdate(_id , { name , slug:slugify(name)}, {new:true});
!product&&res.status(400).json({ message: "product not found" });
 product&&res.status(201).json({ message: "product updated seccessfully" , product});

};

//*------------
//*3--delete product
//*------------
const deleteproduct = async (req, res, next) => {
  const { _id } = req.params;

  const product = await productModel.findByIdAndDelete(_id );
!product&&res.status(400).json({ message: "product not found" });
 product&&res.status(201).json({ message: "product deleted seccessfully" });

};

//*------------
//*4--get all product
//*------------
const getAllProducts = async (req, res, next) => {

  const Products = await productModel.find() ;
 res.status(201).json({ Products});

};

export {
  addproduct,
  updateproduct,
  deleteproduct,
  getAllProducts,
};
