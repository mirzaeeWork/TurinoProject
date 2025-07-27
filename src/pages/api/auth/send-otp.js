import connectDB from "@/utils/connectDB";
import {updateUser, getUserByMobile, createUser } from "@/utils/crudModels/User";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط درخواست POST مجاز است." });
  }

  const { mobile } = req.body;

  if (!mobile || !/^09\d{9}$/.test(mobile)) {
    return res.status(400).json({ message: "شماره موبایل معتبر نیست." });
  }

  try {
    await connectDB();

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // پیدا کردن یا ایجاد کاربر
    let user = await getUserByMobile(mobile);

    if (!user) {
      user = await createUser({ mobile });
    }

    // به‌روزرسانی OTP و تاریخ انقضا
    await updateUser(user._id.toString(), {
      otpCode,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 دقیقه
    });

    // TODO: ارسال واقعی پیامک در اینجا

    // console.log(`🔐 OTP برای ${mobile}: ${otpCode}`); // برای تست

    return res.status(200).json({code:otpCode, message: "کد اعتبارسنجی ارسال شد." });
  } catch (error) {
    console.error("❌ خطا در ارسال کد اعتبارسنجی:", error);
    return res.status(500).json({ message: "خطای داخلی سرور." });
  }
}
