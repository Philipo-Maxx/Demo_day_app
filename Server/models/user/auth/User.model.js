import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      trim: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      enum: ["user", "admin"],
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("Shopper", userSchema);
export { User };
