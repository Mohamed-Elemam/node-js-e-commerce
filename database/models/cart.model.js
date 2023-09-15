import mongoose, { Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        productId: { type: Types.ObjectId  , ref:"product"},
        quantity: {type:Number, default:1,min:1},
        price: Number,
        totalProductDiscount: Number,
      },
    ],
    totalprice: Number,
    totalpriceAfterDiscount: Number,
    discount: Number,
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);
