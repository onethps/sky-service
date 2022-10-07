import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  mobilePhone: {
    type: Number,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
