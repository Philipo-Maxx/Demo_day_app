import { Schema, model, Types } from "mongoose";

const otpSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "Shopper",
      required: true,
    },
    otp: {
      type: String,
      trim: true,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
      default: Date.now,
      index: { expires: "5m" },
    },
    otpType: {
      type: String,
      enum: ["verify-email", "reset-password", "forgot-password"],
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const OTP = model("ShopperOtp", otpSchema);
export { OTP };
