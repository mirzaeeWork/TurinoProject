import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
    nationalCode: {
      type: String,
    },
    fullName: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: false,
    },
    birthDate: {
      type: Date,
    },
  },
  { timestamps: true } // برای createdAt و updatedAt
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
