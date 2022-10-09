import mongoose from "mongoose";

const TechCardSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  modName: {
    type: String,
  },
  modTables: {
    type: Array,
  },
  netPrice: {
    type: String,
  },
  price: {
    type: String,
  },
  marginPricePercent: {
    type: String,
  },
});

export const Techcard = mongoose.model("Techcard", TechCardSchema);
