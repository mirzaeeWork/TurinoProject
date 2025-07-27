import Image from "next/image";
import Link from "next/link";

function SuccessfulPayment() {
  const classLink = `
  bg-[#D8FFE1] w-[225px] sm:w-[250px] h-[60px]
  lg:w-[340px] lg:h-[75px] !text-[20px] lg:!text-[28px]
  flex items-center justify-center !font-semibold
  rounded-[16px] text-[#28A745] mt-2 mb-4
`;
  return (
    <div
      className="max-w-[1188px] mx-auto px-[1rem] xl:px-0 flex flex-col-reverse sm:flex-row items-center justify-evenly 
    py-20 sm:py-0 sm:h-[65vh] "
    >
      <div className="mt-5 sm:mt-0">
        <>
          <h3 className="text-[24px] sm:text-[26px] lg:text-[36px] font-semibold mb-3">
            خرید شما با موفقیت انجام شد!
          </h3>
          <Link href="/" className={classLink}>
            بازگشت به صفحه اصلی
          </Link>
          <Link href={`/dashboard/transactions`} className={classLink}>
            مشاهده تراکنش‌ها
          </Link>
        </>
      </div>
      <div className="w-[240px] h-[240px] sm:w-[350px] sm:h-[350px]">
        <Image
          src="/images/successful-payment.webp"
          className="w-full h-full"
          alt="Not Found"
          width={1000}
          height={800}
          priority
        />
      </div>
    </div>
  );
}

export default SuccessfulPayment;
