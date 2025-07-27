import MyTourIcons from "@/components/icons/MyTourIcons";
import { formatPersianFullDate, formatPersianNumber, generateTourNumber, vehicleMap } from "@/utils/formatDate";

const originName = (originId, origins) =>
  origins?.find((item) => item._id === originId);

const destinationName = (destinationId, destinations) =>
  destinations?.find((item) => item._id === destinationId);

const getStatusBadge = (status) => {
  if (status === "done")
    return (
      <span className="text-[8px] sm:text-[12px] text-(--color-link) bg-[#28A7454D] rounded-[27px] w-fit  px-2 pt-1 sm:pt-0.5 ">
        به اتمام رسیده
      </span>
    );
  if (status === "active")
    return (
      <span className="text-[8px] sm:text-[12px] bg-yellow-100 text-yellow-700 rounded-[27px] w-fit  px-2 pt-1 sm:pt-0.5 ">
        در حال برگزاری
      </span>
    );
  return null;
};


function Tour({tour,origins, destinations,index }) {
  const {
    title,
    originId,
    destinationId,
    startDate,
    endDate,
    fleetVehicle,
    price,
    status = index === 2 ? "active" : "done", 
  } = tour;


  const vehicle = vehicleMap[fleetVehicle] || {};
  return (
    <div className="border border-(--color-border)  rounded-[10px]">
      <div className="flex justify-end pl-2 py-2  sm:hidden">
        {getStatusBadge(status)}
      </div>

      <div className="p-2 sm:p-4 flex justify-between  sm:grid grid-cols-3">
        <span className="flex items-center  gap-1 text-[12px] sm:text-[14px]">
          <MyTourIcons className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
          {title}
        </span>
        <span className="flex items-center gap-1  text-[12px] sm:text-[14px]">
          {vehicle.icon} سفر با {vehicle.label}
        </span>
        <div className="hidden sm:flex justify-end ">
          {getStatusBadge(status)}
        </div>
      </div>
      <div className=" sm:p-4 grid grid-cols-1 sm:grid-cols-3">
        <span className="p-2 sm:p-0 flex flex-wrap items-center gap-1  text-[14px] ">
          <span className="flex items-center gap-1 font-semibold ">
            {originName(originId, origins)?.faName} به{" "}
            {destinationName(destinationId, destinations)?.faName}
          </span>
          <span className="text-[12px] sm:text-[14px]">
            {" "}
            . {formatPersianFullDate(startDate)}
          </span>
        </span>
        <span className="p-2 sm:p-0 flex flex-wrap items-center gap-1 text-[14px] mb-2 sm:mb-0">
          <span className="flex items-center gap-1 font-semibold">
            تاریخ برگشت{" "}
          </span>
          <span className="text-[12px] sm:text-[14px]">
            {" "}
            . {formatPersianFullDate(endDate)}
          </span>
        </span>
      </div>
      <div className="border-t border-(--color-border)" />

      <div className="flex flex-col sm:flex-row sm:items-center p-2 sm:p-4">
        <div className="flex items-center sm:justify-center gap-3  sm:border-l border-(--color-border) sm:pl-4">
          <span className="text-[#00000080] text-[10px] sm:text-[14px]">
            شماره تور
          </span>
          <span className="font-medium text-[12px] sm:text-[14px]">
            {generateTourNumber(startDate, price)}
          </span>
        </div>
        <div className="flex items-center sm:justify-center  text-[10px] sm:text-[14px] mt-2 sm:mt-0 sm:pr-4">
          <span className="text-[#00000080] ml-3 text-[12px] sm:text-[14px]">
            {" "}
            مبلغ پرداخت شده
          </span>
          <span className="font-medium ml-1">
            {formatPersianNumber(price)}{" "}
          </span>
          <span className="text-[#00000080] text-[8px] sm:text-[10px] font-light">
            تومان
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tour;


