import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { toPersianDigits } from "@/utils/formatDate";

function PhoneOrderBanner() {
  return (
    <section className="max-w-[1188px] mx-auto px-[1rem] xl:px-0 pt-20 ">
      <div className="w-full sm:h-[251px] rounded-[10px] border border-(--color-border) sm:overflow-hidden flex flex-col sm:flex-row">
        <div
          className="w-full sm:w-[74%] h-[128px] sm:h-full bg-(--color-link) px-3 sm:px-10 
        flex justify-between rounded-tl-[10px] rounded-tr-[10px]  sm:rounded-[10px] relative"
        >
          <div className="flex items-start flex-col pt-3 sm:pt-10">
            <h3 className="text-[22px] sm:text-[32px] lg:text-[48px] font-extrabold text-white">
              خرید تلفی از{" "}
              <span className="text-(--color-green-dark)">تورینو</span>
            </h3>
            <p className="text-[14px] sm:text-[20px] lg:text-[32px] text-white">
              به هرکجا که میخواهید!
            </p>
          </div>
          <div
            className="mt-[-30px] sm:absolute sm:bottom-0  sm:left-10 w-[50%] sm:w-[250px] lg:w-[308px] 
          aspect-[3/2] sm:aspect-[4/3.5] lg:aspect-[4/3]
           "
          >
            <Image
              className="w-full h-full z-5 sm:z-0"
              src="/images/home/call.webp"
              width={1000}
              height={1000}
              alt="call"
            />
          </div>
        </div>
        <div className="sm:w-[26%] flex sm:flex-col items-center h-full gap-3 my-3 justify-center">
          <p className="flex items-center gap-2 text-[20px] sm:text-[28px] font-bold">
            <span>{toPersianDigits("021-1840")}</span>

            <FaPhone />
          </p>
          <button
            className="bg-(--color-green-dark) w-[136px] h-[38px] sm:w-[90%] lg:w-[175px] sm:h-[40px] text-[14px] sm:text-[16px] 
             rounded-[9px] text-white cursor-pointer "
          >
            اطلاعات بیشتر
          </button>
        </div>
      </div>
    </section>
  );
}

export default PhoneOrderBanner;
