import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    originId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Origins",
      required: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    title: { type: String },
    fleetVehicle: { type: String },
    price: { type: Number },
    availableSeats: { type: Number },
    insurance: { type: Boolean },
    options: [{ type: String }],
    image: { type: String },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

export default Tour;
