import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    logo: {
      type: String,
      // required:true
    },
  },
  { timestamps: true, 
    // toObject: { virtuals: true }, toJSON: { virtuals: true }
   }

);

export const brandModel = mongoose.model("brand", brandSchema);
