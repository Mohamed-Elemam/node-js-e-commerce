import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    // ================= text section==================
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    desc: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      
    },
    // ================= Specifications section==================
    colors: [String],
    sizes: [String],
    // ================= price section==================
    price: {
      type: Number,
      required: true,
      default: 1,
    },
    appliedDiscount: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    // ================= images section==================
    images: [
      {
        secure_url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    // ======= Related Ids section =======
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customId: String,
  },
  {
    timestamps: true,
    // toObject: { virtuals: true }, toJSON: { virtuals: true }
  }
);

export const productModel = model("product", productSchema);
