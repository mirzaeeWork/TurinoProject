import { verifyToken } from "@/lib/verifyToken";
import { getUserBasket } from "@/utils/crudModels/Basket";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }

  try {
    const userId = req.user.id;
    const basket = await getUserBasket(userId);
    res.status(200).json(basket);
  } catch (err) {
    console.error("Error in getting basket:", err.message);
    res.status(500).json({ message: err.message || "خطا در دریافت سبد خرید." });
  }
}

export default verifyToken(handler);
