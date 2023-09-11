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
      enum: [ "admin", "user"],
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
    isConfirmed: Boolean,
    isDeleted: Boolean,
    review:String,
    wishlist:[{type:Schema.Types.ObjectId , ref:'product'}]

  },
  { timestamps: true }
);


userSchema.pre('save' , function(){
  console.log(process.env.SALT_ROUNDS)
   const hashedPassword = bcrypt.hashSync(this.password ,8)
   this.password = hashedPassword
})

export const userModel = model("user", userSchema);
