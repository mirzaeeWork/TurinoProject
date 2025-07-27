import { useEffect, useRef } from "react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";

export function useAxios() {
  const axiosRef = useRef(null);
  const sessionRef = useRef(null);
  const { data: session, update } = useSession();

  // Always keep sessionRef up to date
  useEffect(() => {
    // console.log("session :", session);
    sessionRef.current = session;
  }, [session]);

  // Only create axios once
  if (!axiosRef.current) {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    // Request interceptor (runs on every request)
    instance.interceptors.request.use((config) => {
      const token = sessionRef.current?.accessToken;
      // console.log(" token :", token);
      if (typeof token === "string") {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for token refresh
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry &&
          sessionRef.current?.refreshToken
        ) {
          // console.log("refreshToken :", sessionRef.current.refreshToken);
          originalRequest._retry = true;

          try {
            const refreshResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
              { refreshToken: sessionRef.current.refreshToken }
            );

            const newAccessToken = refreshResponse.data.accessToken;

            console.log("newAccessToken :", newAccessToken);

            sessionRef.current = {
              ...sessionRef.current,
              accessToken: newAccessToken,
            };

            await update({
              ...sessionRef.current
            });

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            signOut();
          }
        }

        return Promise.reject(error);
      }
    );

    axiosRef.current = instance;
  }

  return axiosRef.current;
}
