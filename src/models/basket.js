import mongoose from "mongoose";


const basketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    origin: {
      id: { type: String },
      name: { type: String },
      faName: { type: String },
    },
    destination: {
      id: { type: String },
      name: { type: String },
      faName: { type: String },
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
  { timestamps: true }
);

const Basket = mongoose.models.Basket || mongoose.model("Basket", basketSchema);

export default  Basket;
