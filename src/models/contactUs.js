import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  title: { type: String },
  message: { type: String },
}, {
  timestamps: true // اضافه می‌کند createdAt و updatedAt
});

const ContactUs=mongoose.models.ContactUs || mongoose.model('ContactUs', ContactUsSchema);

export default  ContactUs


