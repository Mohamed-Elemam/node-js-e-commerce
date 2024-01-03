import { cartModel } from "./../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";

function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });
  cart.totalprice = totalPrice;
}
//*------------
//*1--add to cart
//*------------

const addToCart = async (req, res, next) => {
  let userId = req.user._id;
  let isProduct = await productModel.findById(req.body.productId);
  if (!isProduct) {
    return next(new Error("Product not found", 404));
  }

  req.body.price = isProduct.price;

  let isCart = await cartModel.findOne({ userId });
  if (!isCart) {
    let cart = new cartModel({
      userId,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "success", cart });
  }

  let item = isCart.cartItems.find(
    (ele) => ele?.productId == req.body.productId
  );
  if (item) {
    item.quantity += req.body.quantity || 1;
  } else {
    isCart.cartItems.push(req.body);
  }
  calcTotalPrice(isCart);

  if (isCart.discount) {
    const discountAmount = (isCart.totalprice * isCart.discount) / 100;
    isCart.totalpriceAfterDiscount = isCart.totalprice - discountAmount;
  }
  await isCart.save();
  res.status(201).json({ message: "success", cart: isCart });
};

//*------------
//*2-- remove from cart
//*------------

const removeFromCart = async (req, res, next) => {
  const { _id } = req.params;
  let result = await cartModel.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { cartItems: { _id } } },
    { new: true }
  );
  if (!result) {
    return next(new Error("Product not found", 404));
  }
  calcTotalPrice(result);
  if (result.discount) {
    const discountAmount = (result.totalprice * result.discount) / 100;
    result.totalpriceAfterDiscount = result.totalprice - discountAmount;
  }
  res.status(201).json({ message: "success", cart: result });
};

//*------------
//*3-- update product quantity
//*------------
const updateProductQuantity = async (req, res, next) => {
  let isProduct = await productModel.findById(req.body.productId);
  if (!isProduct) {
    return next(new Error("Product not found", 404));
  }
  let isCartExist = await cartModel.findOne({ userId: req.user._id });
  if (!isCartExist) {
    return next(new Error("cart not found", 404));
  }
  let item = isCartExist.cartItems.find(
    (ele) => ele.productId == req.body.productId
  );
  if (!item) {
    return next(new Error("item is not in cart found", 404));
  }
  item.quantity = req.body.quantity;
  calcTotalPrice(isCartExist);
  if (isCartExist.discount) {
    const discountAmount =
      (isCartExist.totalprice * isCartExist.discount) / 100;
    isCartExist.totalpriceAfterDiscount =
      isCartExist.totalprice - discountAmount;
  }
  await isCartExist.save();
  res.status(201).json({ message: "success", cart: isCartExist });
};
//*------------
//*4-- logged User Cart
//*------------
const loggedUserCart = async (req, res) => {
  const { _id } = req.params;

  const cart = await cartModel
    .findOne({ userId: _id })
    .populate("cartItems.productId");
  res.status(201).json({ message: "success", cart });
};

//*------------
//*5-- apply coupon
//*------------
const applyCoupon = async (req, res) => {
  const { couponCode } = req.params;
  const coupon = await couponModel.findOne({
    code: couponCode,
    expiresAt: { $gt: Date.now() },
  });
  if (!coupon) {
    return res.status(400).json({ message: "coupon not found" });
  }

  const cart = await cartModel.findOne({ userId: req.user._id });

  const discountAmount = (cart.totalprice * coupon.discount) / 100;
  cart.totalpriceAfterDiscount = cart.totalprice - discountAmount;
  // if(!cart.discount){
  cart.discount = coupon.discount;
  // }
  await cart.save();

  res.status(200).json({ message: "Coupon applied successfully", cart });
};

export {
  addToCart,
  removeFromCart,
  updateProductQuantity,
  loggedUserCart,
  applyCoupon,
};
