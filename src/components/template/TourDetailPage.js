import {
  FleetVehicle,
  formatToPersianDate,
  getFormatTouerDate,
  toPersianDigits,
} from "@/utils/formatDate";
import Image from "next/image";
import React from "react";
import { FaMap} from "react-icons/fa6";
import FeatureItem from "../module/tour-detail/FeatureItem";
import PriceAndAction from "../module/tour-detail/PriceAndAction";
import TourInfoItem from "../module/tour-detail/TourInfoItem";


function TourDetailPage({ tour, origin }) {
  const {
    image,
    title,
    _id,
    price,
    startDate,
    endDate,
    availableSeats,
    insurance,
  } = tour;

  const { duration } = getFormatTouerDate(tour);

  const features = [
    { icon: "/images/tour-details/user-tick.png", label: "تورلیدر از مبدا" },
    { icon: <FaMap />, label: "برنامه سفر" },
    { icon: "/images/tour-details/medal-star.png", label: "تضمین کیفیت" },
  ];

  return (
    <div className=" px-[1rem] xl:px-0 pt-5 pb-10 md:py-30 md:bg-[#F3F3F3] ">
      <div
        className="max-w-[1188px] mx-auto p-[1rem]  bg-white
       rounded-[10px] overflow-hidden md:border border-(--color-border)"
      >
        <section className="w-full grid md:grid-cols-3">
          <div className="md:col-span-1 aspect-[3/2] md:aspect-[5/4] lg:aspect-[3/2] overflow-hidden rounded-[12px]">
            <Image
              className="w-full h-full"
              src={image}
              alt={title}
              width={1000}
              height={1000}
              priority
            />
          </div>
          <div className="md:col-span-2 flex flex-col justify-between mt-6 md:mt-0 md:mr-6">
            <div className="flex flex-row justify-between items-center md:flex-col md:items-start gap-1 lg:gap-[1rem] mb-4 md:mb-0">
              <h3 className="text-[24px] md:text-[32px] font-bold">{title}</h3>
              <p className="text-[15px] md:text-[20px]">
                {toPersianDigits(`${duration} روز` || "")}
              </p>
            </div>
            <div className="flex justify-between md:gap-x-5 text-[#7D7D7D] text-[13px] md:text-[20px] mb-4 md:mb-0">
              {features.map((item, index) => (
                <FeatureItem key={index} icon={item.icon} label={item.label} />
              ))}
            </div>

            <PriceAndAction
              id={_id}
              price={price}
              className="hidden md:flex items-center justify-between"
            />
          </div>
        </section>

        <section className="flex items-center justify-between md:grid md:grid-cols-6 mt-4 mb-8 md:mt-8 md:mb-0">
          <TourInfoItem
            icon="/images/tour-details/routing.png"
            label="مبدا"
            value={origin.faName}
            className="hidden md:flex border-l border-(--color-border)"
          />

          <TourInfoItem
            icon="/images/tour-details/calendar.png"
            label="تاریخ رفت"
            value={formatToPersianDate(startDate)}
            className="hidden md:flex border-l border-(--color-border)"
          />

          <TourInfoItem
            icon="/images/tour-details/calendar.png"
            label="تاریخ برگشت"
            value={formatToPersianDate(endDate)}
            className="hidden md:flex border-l border-(--color-border)"
          />

          <TourInfoItem
            icon="/images/tour-details/bus.png"
            label="حمل و نقل"
            value={FleetVehicle(tour)}
            className="md:border-l border-(--color-border)"
          />

          <TourInfoItem
            icon="/images/tour-details/profile-user.png"
            label="ظرفیت"
            value={`حداکثر ${availableSeats} نفر`}
            className="md:border-l border-(--color-border)"
          />

          <TourInfoItem
            icon="/images/tour-details/security.png"
            label="بیمه"
            value={insurance ? "بیمه مسافرتی دارد" : "بدون بیمه"}
          />
        </section>

        <PriceAndAction
          id={_id}
          price={price}
          className="md:hidden flex flex-row-reverse items-center justify-between"
        />
      </div>
    </div>
  );
}

export default TourDetailPage;
