import { verifyToken } from "@/lib/verifyToken";
import connectDB from "@/utils/connectDB";
import { getOrdersByUserId } from "@/utils/crudModels/Order";
import { getTourById } from "@/utils/crudModels/Tour";
import { fetchToursByOrders } from "@/utils/crudModels/User";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }

  try {
    const tours = await fetchToursByOrders(req.user.id);
    res.json(tours);
  } catch (err) {
    console.error("Error in getUserTours:", err.message);
    res.status(500).json({ message: "خطا در دریافت تورهای کاربر." });
  }
}

export default verifyToken(handler);
