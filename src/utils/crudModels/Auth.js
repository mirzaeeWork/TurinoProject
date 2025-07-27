import jwt from "jsonwebtoken";
import { getUserByMobile } from "./User";
import connectDB from "../connectDB";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your_jwt_secret";

export async function refreshAccessTokenAuth(refreshToken) {
  if (!refreshToken) {
    throw new Error("خطای دسترسی، مجددا وارد شوید!");
  }

  try {
    const userData = jwt.verify(refreshToken, JWT_SECRET);

    const accessToken = jwt.sign(
      { id: userData.id, mobile: userData.mobile },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return accessToken;
  } catch (err) {
    throw new Error("توکن نامعتبر است. لطفاً دوباره وارد شوید!");
  }
}

export async function checkOtpAndGenerateTokens(mobile, code) {
  try {
    await connectDB();

    const user = await getUserByMobile(mobile);
    if (!user) {
      throw new Error("کاربری با این شماره تماس وجود ندارد!");
    }

    if (user.otpCode !== code || user.otpExpires < Date.now()) {
      throw new Error("کد وارد شده فاقد اعتبار است!");
    }

    const accessToken = jwt.sign(
      { id: user._id.toString(), mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id.toString(), mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        mobile: user.mobile,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
