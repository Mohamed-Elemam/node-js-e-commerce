import { Schema, model } from "mongoose";
// import { const } from './../dbConnection';
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    image: [
      {
        public_id: { 
          type: String,
          // required: ture 
        },
        secure_url: {
        type: String,
          // required: ture
         },
      },
    ],
    role: {
      type: String,
      default: "user",
      enum: ["superAdmin", "admin", "user"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      default: "Offline",
      enum: ["Online", "Offline"],
    },
    gender: {
      type: String,
      default: "Not specified",
      enum: ["male", "female", "Not specified"],
    },
    age: Number,
    token: String,
    forgetCode: String,
  },
  { timestamps: true }
);

// function hashPassword(password){

// userModel.pre save
//   const hashedPassword = bcrypt.hashSync(password ,process.env.SALT_ROUNDS )
// }

export const userModel = model("user", userSchema);
