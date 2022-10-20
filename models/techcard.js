import mongoose from "mongoose";

const TechCardSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  modName: {
    type: String,
    required: true,
  },
  id: String,
  modTables: {
    type: Array,
  },
  categoryPerPriceMod: String,
  netPriceMod: {
    type: String,
  },
  priceMod: {
    type: String,
  },
  marginPricePercentMod: {
    type: String,
  },
});

export const Techcard = mongoose.model("Techcard", TechCardSchema);
