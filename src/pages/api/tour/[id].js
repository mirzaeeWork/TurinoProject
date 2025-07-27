import { getByIdTours } from "@/utils/crudModels/Tour";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "فقط درخواست GET مجاز است." });
  }


  try {
    const { id } = req.query;

    const tour = await getByIdTours({ id });

    res.json(tour);
  } catch (err) {
    console.error("Error in getTourById:", err.message);
    res.status(500).json({ message: err.message || "خطا در دریافت تور." });
  }
}
