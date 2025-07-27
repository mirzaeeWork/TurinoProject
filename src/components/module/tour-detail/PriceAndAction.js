import LoadingForButton from "@/components/element/LoadingForButton";
import useDynamicQuery from "@/hooks/useDynamicQuery";
import { formatPersianNumber } from "@/utils/formatDate";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function PriceAndAction({ id, price, className = "" }) {
  const router = useRouter();

  const { mutate, isPending } = useDynamicQuery({
    mode: "mutation",
    method: "put",
    url: `/basket/${id}`,
  });

  const handleBasket = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.replace("/order-submission");
      },
      onError: (error) => {
        const text =
          error?.response?.data?.message === "Access token required"
            ? "ابتدا وارد سایت شوید"
            : error?.response?.data?.message;
        toast.error(text || error?.message);
      },
    });
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <p className="text-[16px]">
        <span className="text-(--color-price) text-[24px] md:text-[28px] font-medium">
          {formatPersianNumber(price)}
        </span>
        <span className="mr-1 text-[10px] md:text-[14px]">تومان</span>
      </p>
      <button
        onClick={handleBasket}
        className="bg-(--color-link) w-[154px] h-[42px] md:w-[204px] md:h-[56px] !text-[20px] md:!text-[24px] flex items-center justify-center  rounded-[10px] text-white cursor-pointer"
        disabled={isPending}
        style={{
          opacity: isPending ? 0.7 : 1,
          cursor: isPending ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? <LoadingForButton loading={isPending} /> : "رزرو و خرید"}
      </button>
    </div>
  );
}

export default PriceAndAction;
