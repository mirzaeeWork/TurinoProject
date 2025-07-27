import { verifyToken } from "@/lib/verifyToken";
import connectDB from "@/utils/connectDB";
import { getTransactionsByUserId } from "@/utils/crudModels/Transaction";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }
  try {
    await connectDB();

    const transactions = await getTransactionsByUserId(req.user.id);
    if (!transactions.length) {
      return res.json([]);
    }

    res.json(transactions);
  } catch (err) {
    console.error("Error in getUserTransactions:", err.message);
    res.status(500).json({ message: "خطا در دریافت تراکنش‌های کاربر." });
  }
}

export default verifyToken(handler);
