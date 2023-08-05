import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema({
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
  image:{
    type:String,
    // required:true
  }
});


export const categoriesModel = mongoose.model('category',categoriesSchema)