import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.Mongo_URI);
    console.log("connected to DB");
  } catch (error) {
    throw new Error({ message: "خطا در اتصال به دیتابیس" });
  }
}
