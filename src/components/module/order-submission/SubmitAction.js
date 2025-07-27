import LoadingForButton from "@/components/element/LoadingForButton";
import {
  formatPersianNumber,
  getFormatTouerDate,
  toPersianDigits,
} from "@/utils/formatDate";

export default function SubmitAction({
  basket,
  isUpdateProfile,
  isUpdateOrder,
}) {
  const { duration } = getFormatTouerDate(basket || null);

  return (
    <div className=" h-full bg-white p-4 rounded-[10px] border sm:border-0 border-(--color-border)">
      <div className="flex justify-between items-center  pb-4 border-b border-dashed border-(--color-border)">
        <h3 className="text-[24px] font-semibold">{basket?.title || ""}</h3>
        <p className="text-[16px]">
          {toPersianDigits(`${duration} روز` || "")}
        </p>
      </div>
      <div className="flex justify-between items-center  py-4 ">
        <p className="text-[16px]">قیمت نهایی</p>
        <p className="text-[16px]">
          <span className="text-(--color-price) text-[24px] md:text-[28px] font-medium">
            {formatPersianNumber(basket?.price || 0)}
          </span>
          <span className="mr-1 text-[10px] md:text-[14px]">تومان</span>
        </p>
      </div>

      <button
        type="submit"
        className="bg-(--color-link) w-full h-[42px]  md:h-[56px] !text-[20px] md:!text-[24px] flex items-center justify-center  rounded-[10px] text-white cursor-pointer"
        disabled={isUpdateProfile || isUpdateOrder}
        style={{
          opacity: isUpdateProfile || isUpdateOrder ? 0.7 : 1,
          cursor: isUpdateProfile || isUpdateOrder ? "not-allowed" : "pointer",
        }}
      >
        {isUpdateProfile || isUpdateOrder ? (
          <LoadingForButton loading={isUpdateProfile || isUpdateOrder} />
        ) : (
          "ثبت و خرید نهایی"
        )}
      </button>
    </div>
  );
}
