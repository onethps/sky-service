import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: {
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
  type: {
    type: String,
    required: true,
  },
  category: String,

  saleStatus: {
    type: Boolean,
    default: true,
  },

  price: {
    type: Number,
    default: 0,
  },
  percent: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 0,
  },
  minQuantity: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
  },
  modIds: {
    type: Array,
    default: [],
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
