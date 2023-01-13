import mongoose from "mongoose";

const StoreSchema = mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

const Store = mongoose.model("Store", StoreSchema);

export default Store;
