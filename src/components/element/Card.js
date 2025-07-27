import {
  formatPersianNumber,
  getShortDescription,
  toPersianDigits,
  truncateText,
} from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";

function Card({ item }) {
  const { image, title, _id, price } = item;

  const description=getShortDescription(item)

  return (
    <div className="blog relative rounded-[10px] shadow-sm shadow-slate-200 overflow-hidden col-span-1">
      <div className="w-full aspect-[3/2] overflow-hidden">
        <Image
          className="w-full h-full"
          src={image}
          alt={title}
          width={1000}
          height={1000}
        />
      </div>

      <div>
        <div className="p-3">
          <Link href={`/tour-detail/${_id}`} className="!text-[22px]">
            {title}
          </Link>
          <p className="text-[15px] mt-3">
            {toPersianDigits(truncateText(description || ""))}
          </p>
        </div>
        <div className="border-t border-t-[#0000001F] p-3 flex items-center justify-between">
          <Link href={`/tour-detail/${_id}`} className="bg-(--color-link) w-[64px] h-[25px] text-[15px] text-center  rounded-[4px] text-white cursor-pointer ">
            رزرو
          </Link>
          <p className="text-[16px]">
            <span className="text-(--color-price)">
              {formatPersianNumber(price)}
            </span>
            <span className="mr-1">تومان</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
