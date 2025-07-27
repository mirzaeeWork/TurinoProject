import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import {
  checkOtpAndGenerateTokens,
  refreshAccessTokenAuth,
} from "@/utils/crudModels/Auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const EXPIRE = Date.now() + 60 * 60 * 1000;

async function refreshAccessToken(token) {
  try {
    const { refreshToken } = token;

    const accessToken = await refreshAccessTokenAuth(refreshToken);
    // console.log("accessToken :", accessToken);

    return {
      accessToken,
      refreshToken: token.refreshToken,
      accessTokenExpires: EXPIRE,
      user: token.user,
    };
  } catch (error) {
    throw new Error(error.message || "خطای ناشناخته در رفرش توکن");
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      // id: "OTP",
      // name: 'OTP',
      async authorize(credentials) {
        try {
          const { mobile, code } = credentials;

          const result = await checkOtpAndGenerateTokens(mobile, code);

          return result;
        } catch (error) {
          console.error("OTP Login Error:", error.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('🔥 JWT callback token: ', token)
      // console.log('🔥 JWT callback user: ', user)

      if (user) {
        const { user: User } = user;
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: EXPIRE,
          user: {
            id: User.id,
            firstName: User.firstName,
            lastName: User.lastName,
            mobile: User.mobile,
          },
        };
      }

      // console.log("Date.now() :",Date.now())
      // console.log("token?.accessTokenExpires :",token?.accessTokenExpires)
      // console.log("Date.now() < token?.accessTokenExpires :",Date.now() < token?.accessTokenExpires)

      if (Date.now() < token?.accessTokenExpires) {
        return token;
      }

      try {
        const result = await refreshAccessToken(token);
        return result;
      } catch (error) {
        console.log("⚠️ Refresh Token Failed:", error.message);

        throw new Error(error.message);
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
