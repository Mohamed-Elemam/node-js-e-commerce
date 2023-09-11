import { brandModel } from '../../../database/models/brand.model.js';
import { userModel } from "../../../database/models/user.model.js";

//*------------
//*1--add to wishlist
//*------------
const addToWishlist = async (req, res, next) => {
  const {_id}=req.user
  
  const user= await userModel.findById({_id})
  console.log(user)

  res.status(201).json({ message: "brand add seccessfully", newBrand });
};

//*------------
//*2-- remove from Wishlist
//*------------

const removeFromWishlist = async (req, res, next) => {
  const { _id } = req.params;

  const brand = await brandModel.findByIdAndDelete(_id);
  if (!brand) {
    return res.status(400).json({ message: "brand not found" });
  }
  if (brand) {
    return res.status(201).json({ message: "brand deleted seccessfully" });
  }
};

const getAllUserwishlist = async (req, res, next) => {
  // const {_id}=req.user
  console.log(req.user._id)///use email?
  const wishlist = await userModel.findById({})
  
res.status(200).json({wishlist})
};

export {
  addToWishlist, 
  removeFromWishlist,
  getAllUserwishlist
};
