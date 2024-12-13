import { Schema, model } from "mongoose";
const FeatureSchema = new Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export const Feature = model("Feature", FeatureSchema);
