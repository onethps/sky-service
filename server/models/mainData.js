import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  count: String,
  price: String,
  spent: String,
});
