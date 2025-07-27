import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";
import AuthConfirmCodeInput from "./ConfirmOtpInput";
import { toPersianDigits } from "@/utils/formatDate";
import LoadingForButton from "@/components/element/LoadingForButton";

function ConfirmOtp({
  formState,
  setFormState,
  isPending,
  mutate,
  closePageConfirmCode,
  closeAllPageLogin,
}) {
  const { mobile, codeOTP, timer, userCode, resendOTP } = formState;
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setFormState((prev) => ({ ...prev, resendOTP: true }));
    }

    if (timer > 0) {
      const interval = setInterval(() => {
        setFormState((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (mobile !== "") setFormState((prev) => ({ ...prev, timer: 120 }));
  }, [mobile]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleResend = () => {
    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setFormState((prev) => ({
            ...prev,
            codeOTP: data.code,
            timer: 120,
            userCode: "",
            resendOTP: false,
          }));
        },
        onError: (error) => {
          const text =
            error?.response?.data?.message === "Access token required"
              ? "ابتدا وارد سایت شوید"
              : error?.response?.data?.message;
          toast.error(text || error?.message);
        },
      }
    );
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    const res = await signIn("credentials", {
      mobile,
      code: userCode,
      redirect: false,
    });

    if (res.ok) {
      toast.success("وارد حساب کاربری خود شدید.");
      setFormState({
        mobile: "",
        codeOTP: null,
        userCode: "",
        timer: null,
        resendOTP: false,
      });
      closeAllPageLogin();
    } else {
      toast.error(res.error);
    }
    setIsLoggingIn(false);
  };

  return (
    <>
      <div className="relative w-full">
        <IoArrowBackOutline
          className="absolute top-1.5 -left-1 text-[24px] text-[#171717]"
          onClick={closePageConfirmCode}
        />
        <h3 className="text-[22px] sm:text-[28px] font-semibold pt-9 text-center ">
          کد تایید را وارد کنید.
        </h3>
        <p className={`text-[14px] sm:text-[16px] mt-2 mb-4 text-center`}>
          کد تایید به شماره {toPersianDigits(mobile)} ارسال شد.
        </p>
        <div className={`mb-4`}>
          <AuthConfirmCodeInput
            timer={timer}
            mobile={mobile}
            setUserCode={(code) =>
              setFormState((prev) => ({ ...prev, userCode: code }))
            }
          />
        </div>
        <div className={`flex justify-between pb-6`}>
          <section className={`flex items-center justify-center gap-1.5`}>
            <span className={` text-[14px] w-[1.3rem]`}>
              {toPersianDigits(formatTime(timer))}
            </span>

            <p className={`text-[12px] font-normal`}>تا ارسال مجدد کد</p>
          </section>
          {resendOTP && (
            <button
              className={`text-darkGray rounded-4 text-[10px] lg:text-[12px] font-normal bg-transparent cursor-pointer`}
              onClick={handleResend}
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
    
        <button
          className={`flex items-center justify-center gap-1 transition-all duration-300 ease-in-out 
            outline-none rounded-[5px] w-full py-2  bg-(--color-link) mb-5 text-white text-[18px]`}
          disabled={userCode.length < 6 || isLoggingIn}
          style={{
            opacity: userCode.length < 6 || isLoggingIn ? 0.7 : 1,
            cursor:
              userCode.length < 6 || isLoggingIn ? "not-allowed" : "pointer",
          }}
          onClick={handleLogin}
        >
          {isLoggingIn ? (
            <LoadingForButton loading={isLoggingIn} />
          ) : "ورود به تورینو" }
        </button>
      </div>
    </>
  );
}

export default ConfirmOtp;
