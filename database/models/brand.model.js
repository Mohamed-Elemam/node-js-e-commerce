import mongoose, { model } from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim:true,
  },
  slug: {
    type: String,
    lowercase:true,
  },
  logo:{
    type:String,
    // required:true
  }
});


export const brandModel = model('brand',brandSchema)