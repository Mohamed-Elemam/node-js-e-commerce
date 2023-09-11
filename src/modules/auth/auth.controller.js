import bcrypt from "bcrypt";
import { userModel } from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken";

//*------------
//*1--signUp
//*------------
const signUp = async (req, res, next) => {

  const {
  userName,
  email,
  password,
  age,
  phoneNumber,
  address,
  gender} = req.body

  const isEmailExist = await userModel.findOne({email});
  if (isEmailExist) {
    return res.status(404).json({ message: "Email already exist" })
  }
  const newUser = new userModel({  userName,email,password,age,phoneNumber,address,gender });

  //*token
  // const token = jwt.sign(newUser , process.env.TOKEN_SECRET)
  // const token = jwt.sign(newUser , '__Ecomm')


//*confirm mail
//   const link = `${req.headers}://${req.host}.com/user/confirm/${token}` 
//   sendConfirmationEmail(email , 'Email confimation mail' ,
//  `<a href=${link}>Click here to confirm mail</a>`
//    )



  await newUser.save();


  res.status(201).json({ message: "seccess", newUser });
};

//*------------
//*2--logIn
//*------------
const logIn = async (req, res, next) => {
 
  const {
    email,
    password,
  } = req.body
  

  const isEmailExist = await userModel.findOne({email});
  if (!isEmailExist) {
    return res.status(404).json({ message: "Email not found please sign up" })
  }
  // const isEmailConfirmed = await userModel.findOne({email});
  // if (!isEmailConfirmed) {
    //   return res.status(404).json({ message: "Email not found please sign up" })
    // }
    
    const user = await userModel.findOne({  email  });
    
      if (!user){
        res.status(404).json({ message: "Invalid login credentials" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }
  // process.env.SALT_ROUNDS
    // const decodedPassword = bcrypt.compareSync(password  , 8)

  res.status(201).json({ message: "seccess", user });
};
//*------------
//*3--update user
//*------------
const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  const {userName,email,age,phoneNumber,address,gender} = req.body
  
  const user = await userModel.findByIdAndUpdate(_id, {userName,email,age,phoneNumber,address,gender},{ new: true });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

    return res.status(201).json({ message: "user updated seccessfully", user });
};

//*------------
//*4--delete user
//*------------
const deleteUser = async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findByIdAndDelete(_id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

    user.isDeleted = true
    return res.status(201).json({ message: "user deleted seccessfully" });
};

//*------------
//*5--forget Password
//*------------
const forgetPassword = async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findByIdAndDelete(_id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }



    return res.status(201).json({ message: "user deleted seccessfully" });
};



export {
  signUp,
  logIn,
  updateUser,
  deleteUser,
  forgetPassword,
};
/*
1-sign up
token
confirm acc
auth
login
forget password
soft delete

*/

// userName
// email
// password
// age
// phoneNumber:
// address
// gender
//*-----------
// public_id
// secure_url
// status:
// token
// forgetCode
// role