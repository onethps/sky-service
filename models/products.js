import mongoose from "mongoose";

const productSchema = mongoose.Schema({
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

  netCost: {
    type: Number,
    default: 0,
  },
  marginPrice: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: "шт",
  },
  minQuantity: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
