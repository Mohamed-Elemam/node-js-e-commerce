import { brandModel } from "../../../database/models/brand.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { productModel } from '../../../database/models/product.model.js';

//*------------
//*1--add review on product
//*------------
const addReview = async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.params;
  const {review } = req.body;

  const product = await productModel.findById( productId );
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  const result = await userModel.findByIdAndUpdate(
    { _id },
    { $addToSet: { reviews: [productId, review] } },
    {new: true}
  );

  res.status(201).json({ message: "review added successfully ", result:result.reviews });
};

//*------------
//*2--  delete review
//*------------

const deleteReview = async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.params;

  const product = await productModel.findById( productId );
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  const result = await userModel.findByIdAndUpdate(
    { _id },
    { $pull: { reviews: productId } },
    {new: true}
  );

  res.status(201).json({ message: "review removed successfully ", result:result.reviews });
};

//* 3 update review

const updateReview = async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.params;
  const {review } = req.body;


  const product = await productModel.findById( productId );
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  const result = await userModel.findByIdAndUpdate(
    { _id },
    { $pull: { reviews: productId , review} },
    {new: true}
  );

  res.status(201).json({ message: "review updated successfully ", result:result.reviews });
};

//* 4 get user reviews
const getAllUserReviews = async (req, res, next) => {


  const user = await userModel.findById({_id:req.user._id})
  res.status(200).json({ reviews:user.reviews });
};

export { addReview, deleteReview,updateReview, getAllUserReviews };
