import { refreshAccessTokenAuth } from "@/utils/crudModels/Auth";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط درخواست POST مجاز است." });
  }

  const { refreshToken } = req.body;
  try {
    const accessToken =await  refreshAccessTokenAuth(refreshToken);

    res.json({ accessToken });
  } catch (error) {
    console.error("Error in checkOtp:", error.message);
    res
      .status(500)
      .json({ message: error.message || "خطا در بررسی کد اعتبارسنجی." });
  }
}
