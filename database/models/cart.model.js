import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    cartItem: [
      {
        product: { type: Schema.Types.ObjectId  , ref:"product"},
        quantity: Number,
        price: Number,
      },
    ],
    totalprice: Number,
    totalpriceAfterDiscount: Number,
    discount: Number,
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);
