import { config } from "dotenv";
config();
import { userModel } from "../../../database/models/user.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { cartModel } from "./../../../database/models/cart.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//*------------
//*1--create cash order
//*------------
const createCashOrder = async (req, res, next) => {
  const { id } = req.params;
  const cart = await cartModel.findById(id);
  if (!cart) {
    return res.status(404).json({ message: "cart is empty" });
  }
  const totalOrderPrice = cart.totalpriceAfterDiscount
    ? cart.totalpriceAfterDiscount
    : cart.totalprice;
  const order = await orderModel({
    userId: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();

  let productsIncrement = cart.cartItems.map((item) => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
    },
  }));
  await productModel.bulkWrite(productsIncrement);

  await cartModel.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: "order placed successfully", order });
};

//*------------
//*2 checkout order
//*------------

const checkoutOrder = async (req, res, next) => {
  const { cartId } = req.params;
  const cart = await cartModel.findById(cartId);
  !cart && res.status(404).json({ message: "cart does not exist" });
  let totalPrice = cart.totalpriceAfterDiscount
    ? cart.totalpriceAfterDiscount
    : cart.totalprice;
  res.json(cart);
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalPrice,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000/646",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
  });
  res.json({ message: "success", session });
};

//*------------
//*3 getUserOrders
//*------------

const getUserOrders = async (req, res, next) => {
  const orders = await orderModel.findOne({ userId: req.user._id });
  if (!orders) {
    return res.status(404).json({ message: "no order found" });
  }

  res.status(201).json({ message: "success", orders });
};

export { createCashOrder, getUserOrders, checkoutOrder };
