import { verifyToken } from "@/lib/verifyToken";
import ContactUs from "@/models/contactUs";
import connectDB from "@/utils/connectDB";
import { getUserById } from "@/utils/crudModels/User";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط درخواست POST مجاز است." });
  }

  try {
    await connectDB();
    
    const user = await getUserById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "کاربری با این مشخصات یافت نشد!" });
    }

    const { title, message } = req.body;
    if (!title || !message) {
      return res
        .status(400)
        .json({ message: "داده‌های مورد نظر را وارد کنید!" });
    }

    const newMessage = new ContactUs({
      userId: user._id,
      title,
      message,
    });

    await newMessage.save();

    res.json({ message: "پیام ارسال شد" });
  } catch (err) {
    console.error("Error in sendMessage:", err.message);
    res.status(500).json({ message: "خطا در ارسال پیام." });
  }
}

export default verifyToken(handler);
