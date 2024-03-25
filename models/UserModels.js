import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    sondageChoice: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userSchema", UserSchema);
