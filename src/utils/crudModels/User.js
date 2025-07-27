import connectDB from "../connectDB";
import { getOrdersByUserId } from "./Order";
import { getTourById } from "./Tour";

const { default: User } = require("@/models/user");

// گرفتن همه کاربران
const getAllUsers = async () => {
  return await User.find({});
};

// گرفتن کاربر بر اساس آی‌دی
const getUserById = async (id) => {
  return await User.findById(id);
};

// گرفتن کاربر بر اساس موبایل
const getUserByMobile = async (mobile) => {
  return await User.findOne({ mobile });
};

// ایجاد کاربر جدید
const createUser = async (userData) => {
  // بررسی یکتا بودن موبایل
  const existingUser = await User.findOne({ mobile: userData.mobile });
  if (existingUser) {
    throw new Error("Mobile number must be unique");
  }

  // اعتبارسنجی جنسیت
  if (userData.gender && !["male", "female"].includes(userData.gender)) {
    throw new Error("Gender must be either male or female");
  }

  const newUser = new User({
    ...userData,
    otpExpires: null,
  });

  await newUser.save();
  return newUser;
};

// به‌روزرسانی کاربر
const updateUser = async (id, updatedData) => {
  // اگر موبایل تغییر کنه، یکتا بودن رو بررسی کن
  if (updatedData.mobile) {
    const userWithMobile = await User.findOne({ mobile: updatedData.mobile });
    if (userWithMobile && userWithMobile._id.toString() !== id) {
      throw new Error("شماره موبایل نمی تواند تکراری باشد");
    }
  }

  // اعتبارسنجی جنسیت
  if (updatedData.gender && !["male", "female"].includes(updatedData.gender)) {
    throw new Error("Gender must be either male or female");
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedUser;
};

// حذف کاربر
const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

async function getUserProfile(userId) {
  try {
      await connectDB();
    
    const user = await getUserById(userId);

    if (!user) {
      throw new Error("کاربری با این مشخصات یافت نشد!");
    }

    const plainUser = user.toObject();
    const { __v, otpCode, otpExpires, ...userResData } = plainUser;

    return userResData;
  } catch (err) {
    console.error("Error in getUserProfile:", err.message);
    // پرتاب مجدد خطا برای مدیریت در سطح بالاتر
    throw new Error("خطا در دریافت پروفایل.");
  }
}

export async function fetchToursByOrders(userId) {
  try {
    await connectDB();

    const orders = await getOrdersByUserId(userId);
    if (!orders?.length) {
      return [];
    }

    const tourIds = orders.map((order) => order.tourId);
    const tours = await Promise.all(
      tourIds.map((id) => getTourById(id))
    );

    return tours;
  } catch (error) {
    throw new Error( error?.message || "خطا در دریافت تورهای کاربر: "  );
  }
}

export {
  getUserProfile,
  getAllUsers,
  getUserById,
  getUserByMobile,
  createUser,
  updateUser,
  deleteUser,
};
