import mongoose, { Schema, model } from "mongoose";

const subCategoriesSchema = mongoose.Schema({
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
  categoryId:{
    type:Schema.ObjectId,
    ref:'category'
  }
});


export const subCategoriesModel = model('subCategory',subCategoriesSchema)