import Origin from "@/models/origin";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }
  try {
    await connectDB();
    const { faName } = req.query;

    // اگر faName ارسال شده، فیلتر می‌کنیم، در غیر اینصورت همه را می‌آوریم
    const filter = faName
      ? { faName: { $regex: faName } } // جستجوی غیر حساس به حروف بزرگ/کوچک
      : {};

    const origins = await Origin.find(filter);

    res.json(origins);
  } catch (err) {
    console.error("Error in getOriginsTours:", err.message);
    res.status(500).json({ message: "خطا در دریافت تورهای مبدا." });
  }
}
