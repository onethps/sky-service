import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  category: String,
  netCost: {
    type: Object,
    default: { value: 0, unit: "₴" },
  },
  price: {
    type: Object,
    default: { value: 0, unit: "₴" },
  },
  marginPrice: {
    type: Object,
    default: { value: 0, unit: "%" },
  },
  inSale: Boolean,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  quantity: {
    type: Object,
    default: { value: 0, unit: "шт" },
  },
  minQuantity: {
    type: Object,
    default: { value: 0, unit: "шт" },
  },
  spending: {
    type: Object,
    default: { value: 0, unit: "шт" },
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;