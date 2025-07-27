import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema(
  {
    name: { type: String },
    faName: { type: String },
  },
  {
    timestamps: true,
  }
);

const Destination =
  mongoose.models.Destination ||
  mongoose.model("Destination", DestinationSchema);

export default Destination;
