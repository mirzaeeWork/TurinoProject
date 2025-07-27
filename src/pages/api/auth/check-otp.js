import { checkOtpAndGenerateTokens } from "@/utils/crudModels/Auth";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط درخواست POST مجاز است." });
  }

  const { mobile, code } = req.body;
  if (!mobile || !code) {
    return res
      .status(400)
      .json({ message: "لطفاً شماره موبایل و کد را وارد کنید!" });
  }

  try {
    const result = await checkOtpAndGenerateTokens(mobile, code);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in checkOtp:", error.message);
    res
      .status(500)
      .json({ message: error.message || "خطا در بررسی کد اعتبارسنجی." });
  }
}
