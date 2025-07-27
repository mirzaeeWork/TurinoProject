import mongoose from "mongoose";

const OriginSchema = new mongoose.Schema(
  {
    name: { type: String },
    faName: { type: String },
  },
  {
    timestamps: true,
  }
);

const Origins =
  mongoose.models.Origins || mongoose.model("Origins", OriginSchema);

export default Origins;
