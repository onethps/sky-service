import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  name: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  category: String,

  inSale: {
    type: Boolean,
    default: true,
  },

  netPrice: {
    type: Number,
    default: 0,
  },
  marginPrice: {
    type: Number,
    default: 0,
  },
  marginPercent: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
  },
  minQuantity: {
    type: Number,
    default: 0,
  },
  mod: {
    type: Array,
    default: [],
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
