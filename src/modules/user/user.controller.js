import slugify from "slugify";
import { userModel } from "../../../database/models/user.model.js";

//*------------
//*1--add user
//*------------
const signUp = async (req, res, next) => {
 

  const isEmailExist = await userModel.findOne({email});
  if (isEmailExist) {
    return res.status(404).json({ message: "Email already exist" })
  }

 

  const newUser = new userModel({  });
  await newUser.save();

  res.status(201).json({ message: "brand add seccessfully", newBrand });
};

//*------------
//*2--update user
//*------------
const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  const { name } = req.body;

  const user = await userModel.findByIdAndUpdate(_id, { name}, { new: true });

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  if (user) {
    return res.status(201).json({ message: "user updated seccessfully", user });
  }
};

//*------------
//*3--delete user
//*------------
const deleteUser = async (req, res, next) => {
  const { _id } = req.params;

  const user = await userModel.findByIdAndDelete(_id);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  if (user) {
    return res.status(201).json({ message: "user deleted seccessfully" });
  }
};



export {
  signUp,
  updateUser,
  deleteUser,
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