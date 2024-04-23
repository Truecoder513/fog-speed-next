import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    sondageChoice: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: Object, default: null },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.userSchema || mongoose.model("userSchema", UserSchema);
