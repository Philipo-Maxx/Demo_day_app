
import { Schema, model } from "mongoose";

const AddressSchema = new Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

export const Address = model("Address", AddressSchema);
