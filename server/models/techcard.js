import mongoose from "mongoose";

const TechCardSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  percent: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

export const Techcard = mongoose.model("Techcard", TechCardSchema);
