import connectDB from "@/utils/connectDB";
import Basket from "@/models/basket";
import mongoose from "mongoose";

export async function getUserBasket(userId) {
  try {
    await connectDB();
    const basket = await Basket.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!basket?._id) {
      throw new Error("سبد خرید شما خالی است");
    }
    return basket;
  } catch (error) {
        console.error("Error in getFilteredTours:", error.message);
    throw new Error({ message: error.message });

  }

}
