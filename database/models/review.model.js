import  { Schema, SchemaTypes, model } from "mongoose";

const reviewSchema = new Schema({
  review:String,
  product:{
    type:SchemaTypes.ObjectId,
    ref:'product'
  },
  user:{
    type:SchemaTypes.ObjectId,
    ref:'user'
  },
  rating:{
    type:Number,
    min:1,
    max:5
  }
},
{ timestamps: true}
);


export const reviewModel = model('review',reviewSchema)