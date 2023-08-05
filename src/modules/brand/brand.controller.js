import slugify from "slugify";
import { brandModel } from './../../../database/models/brand.model.js';

//*------------
//*1--add brand
//*------------
const addBrands = async (req, res, next) => {
  const { name } = req.body;

  const isExist = await brandModel.findOne({ name });

  isExist && res.status(400).json({ message: "brand already exist" });
  const newBrand = new brandModel({ name, slug: slugify(name) });
  await newBrand.save();

  res.status(201).json({ message: "brand add seccessfully", newBrand });
};

//*------------
//*2--update brand
//*------------
const updateBrands = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findByIdAndUpdate(_id , { name , slug:slugify(name)}, {new:true});
!brand&&res.status(400).json({ message: "brand not found" });
 brand&&res.status(201).json({ message: "brand updated seccessfully" , brand});

};

//*------------
//*3--delete brand
//*------------
const deleteBrands = async (req, res, next) => {
  const { _id } = req.params;

  const brand = await brandModel.findByIdAndDelete(_id );
!brand&&res.status(400).json({ message: "brand not found" });
 brand&&res.status(201).json({ message: "brand deleted seccessfully" });

};

//*------------
//*4--get all brand
//*------------
const getAllBrands = async (req, res, next) => {

  const brands = await brandModel.find()
 res.status(201).json({ brands});

};

export {
  addBrands,
  updateBrands,
  deleteBrands,
  getAllBrands,
};
