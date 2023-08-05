import mongoose, { model } from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    minlength:[2,'too short name']
  },
  slug: {
    type: String,
    lowercase:true,
  },
  logo:{
    type:String,
    required:true
  }
});


export const brandModel = model('brand',brandSchema)