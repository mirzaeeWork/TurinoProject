import { getFilteredTours } from "@/utils/crudModels/Tour";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }


  try {
    const tours = await getFilteredTours(req.query);
    res.json(tours);
  } catch (err) {
    console.error("Error in getTours:", err.message);
    res.status(500).json({ message: "خطا در دریافت تورها." });
  }
}
