import slugify from "slugify";
import { categoriesModel } from "../../../database/models/categories.model.js";

//*------------
//*1--add category
//*------------
const addCategory = async (req, res, next) => {
  const { name } = req.body;

  const isExist = await categoriesModel.findOne({ name });

  isExist && res.status(400).json({ message: "category already exist" });
  const newCategory = new categoriesModel({ name, slug: slugify(name) });
  await newCategory.save();

  res.status(201).json({ message: "category add seccessfully", newCategory });
};

//*------------
//*2--update category
//*------------
const updateCategory = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const category = await categoriesModel.findByIdAndUpdate(_id , { name , slug:slugify(name)}, {new:true});
!category&&res.status(400).json({ message: "category not found" });
 category&&res.status(201).json({ message: "category updated seccessfully" , category});

};

//*------------
//*3--delete category
//*------------
const deleteCategory = async (req, res, next) => {
  const { _id } = req.params;

  const category = await categoriesModel.findByIdAndDelete(_id );
!category&&res.status(400).json({ message: "category not found" });
 category&&res.status(201).json({ message: "category deleted seccessfully" });

};

//*------------
//*4--delete category
//*------------
const getAllCategories = async (req, res, next) => {

  const categories = await categoriesModel.find() ;
 res.status(201).json({ categories});

};

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
