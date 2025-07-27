import { verifyToken } from "@/lib/verifyToken";
import connectDB from "@/utils/connectDB";
import { getUserById, getUserProfile, updateUser } from "@/utils/crudModels/User";

async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    try {
      const userResData = await getUserProfile(req.user.id);
      res.json(userResData);
    } catch (err) {
      console.error("Error in getProfile:", err.message);
      res.status(500).json({ message: "خطا در دریافت پروفایل." });
    }
  } else if (req.method === "PUT") {
    try {
      const updateData = req.body;

      // Prevent updating sensitive fields directly
      delete updateData.otpCode;
      delete updateData.otpExpires;
      delete updateData._id; // Assuming 'id' is not updatable

      const updatedUser = await updateUser(req.user.id, updateData);
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "کاربری با این مشخصات یافت نشد!" });
      }

      // Exclude sensitive fields
      const { __v, otpCode, otpExpires, ...userResData } =
        updatedUser.toObject();
      res.json({
        message: "تغییرات پروفایل با موفقیت ذخیره شد",
        user: userResData,
      });
    } catch (err) {
      console.error("Error in updateProfile:", err.message);
      res.status(500).json({ message: "خطا در بروزرسانی پروفایل." });
    }
  }else {
    res.status(405).json({ message: "متد مجاز نیست!" });
  }
}

export default verifyToken(handler);
