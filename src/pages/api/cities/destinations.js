import Destination from "@/models/destination";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }
  try {
    await connectDB();
    const { faName } = req.query;

    const filter = faName ? { faName: { $regex: faName } } : {};

    const destinations = await Destination.find(filter);

    res.json(destinations);
  } catch (err) {
    console.error("Error in getDestinationsTours:", err.message);
    res.status(500).json({ message: "خطا در دریافت تورهای مقصد." });
  }
}
