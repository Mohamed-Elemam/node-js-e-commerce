import { cartModel } from './../../../database/models/cart.model.js';
import { productModel } from "../../../database/models/product.model.js";


function calcTotalPrice(cart){
  let totalPrice = 0
  cart.cartItems.forEach(ele=>{
    totalPrice += ele.quantity * ele.price
  })
   return cart.totalprice = totalPrice
}
//*------------
//*1--add to cart
//*------------
const addToCart = async (req, res, next) => {

  let userId = req.user._id;
  let isProduct = await productModel.findById(req.body.productId)
  if(!isProduct){
    return next(new Error('Product not found',404))
  }

  req.body.price = isProduct.price

  let isCart = await cartModel.findOne({userId})
  if(!isCart){

    let cart = new cartModel({
      userId,
      cartItems:[
        // {
      req.body
      // totalProductDiscount: (isProduct.price-isProduct.priceAfterDiscount) ,
      // isProduct.appliedDiscount ||
    // }
  ]})
    calcTotalPrice(cart)
    await cart.save()
    return res.status(201).json({ message: "success", cart });
    
  }

  let item = isCart.cartItems.find(ele => ele?.productId == req.body.productId)
  if(item){
    item.quantity += req.body.quantity || 1
    
  }else{
    isCart.cartItems.push(req.body)
  }
  calcTotalPrice(isCart)
  await isCart.save()
   res.status(201).json({ message: "success", cart:isCart });
 
};

//*------------
//*2-- remove from cart
//*------------

const removeFromCart = async (req, res, next) => {

  const {_id}=req.params
  let result = await cartModel.findOneAndUpdate({userId:req.user._id},{$pull:{cartItems:{_id}}},{new:true})
  if(!result){
    return next(new Error('Product not found',404))
  }
  calcTotalPrice(result)
  res.status(201).json({ message: "success", cart:result });

};

//*------------
//*3-- update product quantity
//*------------
const updateProductQuantity = async (req, res, next) => {
  
  let isProduct = await productModel.findById(req.body.productId)
  if(!isProduct){
    return next(new Error('Product not found',404))
  }
  let isCartExist = await cartModel.findOne({userId:req.user._id})
  if(!isCartExist){
    return next(new Error('cart not found',404))
  }
  let item = isCartExist.cartItems.find(ele => ele.productId == req.body.productId)
  if(!item){
    return next(new Error('item is not in cart found',404))
    
  }
  item.quantity=req.body.quantity
  calcTotalPrice(isCartExist)
  await isCartExist.save()
   res.status(201).json({ message: "success", cart:isCartExist });
 
};
//*------------
//*4-- logged User Cart
//*------------
const loggedUserCart = async (req, res ,next)=>{

  const cart = await cartModel.findOne({userId:req.user._id})
  .populate("cartItems.productId")
  res.status(201).json({ message: "success", cart });

}
export {
  addToCart, 
  removeFromCart,
  updateProductQuantity,
  loggedUserCart
};
