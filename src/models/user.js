import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    otpCode: {
      type: String,
    },
    otpExpires: {
      type: Number, // timestamp
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    nationalCode: {
      type: String,
      default: "",
    },
    birthDate: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: false,
    },
    email: {
      type: String,
      default: "",
    },
    shaba_code: {
      type: String,
      default: "",
    },
    debitCard_code: {
      type: String,
      default: "",
    },
    accountIdentifier: {
      type: String,
      default: "",
    },
    payment: {
      shaba_code: { type: String, default: "" },
      debitCard_code: { type: String, default: "" },
      accountIdentifier: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
