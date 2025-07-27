import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true } // createdAt و updatedAt به‌صورت خودکار اضافه می‌شن
);
 
const Transaction= mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction