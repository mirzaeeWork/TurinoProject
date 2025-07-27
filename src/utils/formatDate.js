import { FaBus, FaTruckMonster, FaVanShuttle } from "react-icons/fa6";
import { LuShip } from "react-icons/lu";
import { PiAirplane } from "react-icons/pi";

export function truncateText(text, maxLength = 40) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function formatPersianNumber(num) {
  return Number(num).toLocaleString("fa-IR");
}

export function toPersianDigits(str) {
  str = String(str);
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

export function isAfterDay(d1, d2) {
  const date1 = d1.toDate();
  const date2 = d2.toDate();

  const day1 =
    date1.getFullYear() * 10000 + date1.getMonth() * 100 + date1.getDate();
  const day2 =
    date2.getFullYear() * 10000 + date2.getMonth() * 100 + date2.getDate();

  return day1 > day2;
}

export const formatDate = (dateObj) => {
  return new Intl.DateTimeFormat("en-CA").format(new Date(dateObj));
};

// ====================

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export function getFormatTouerDate(tour) {
  if (!tour) return { duration: 0, month: "" };
  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);

  // استخراج ماه شروع به فارسی
  const month = monthNames[start.getMonth()];

  // محاسبه تعداد روزها
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  return { month, duration };
}

export function FleetVehicle(tour) {
  // ترجمه وسیله نقلیه
  const vehicleMap = {
    Airplane: "هواپیما",
    Bus: "اتوبوس",
    SUV: "آفرود",
    Van: "ون",
    Ship: "کشتی",
  };
  const vehicle = vehicleMap[tour.fleetVehicle] || tour.fleetVehicle;
  return vehicle;
}

export function getShortDescription(tour) {
  const { month, duration } = getFormatTouerDate(tour);

  const vehicle = FleetVehicle(tour);

  // پیدا کردن گزینه اقامت
  const stayOption =
    tour.options.find(
      (opt) =>
        opt.includes("هتل") || opt.includes("اقامت") || opt.includes("بوم‌گردی")
    ) || "اقامت نامشخص";

  return `${month} . ${duration} روز - ${vehicle} - ${stayOption}`;
}

export function formatToPersianDate(dateStr) {
  const date = new Date(dateStr);
  const toLocale = date.toLocaleDateString("fa-IR-u-ca-persian");
  const [year, , day] = toLocale.split("/");
  const month = monthNames[date.getMonth()];

  return `${day.padStart(2, "۰")} ${month} ${year}`;
}

export function formatPersianFullDate(dateStr) {
  const weekday = new Date(dateStr).toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const persianDate = formatToPersianDate(dateStr);
  return `${weekday} ${persianDate}`;
}

export function generateTourNumber(startDate, price) {
  const date = new Date(startDate);
  const yy = date.getFullYear().toString().slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const priceCode = String(price).slice(0, 2);
  return Number(`${yy}${mm}${dd}${priceCode}`);
}

export function formatDateTimeForTransactions(dateStr) {
  const date = new Date(dateStr);

  const [year, month, day] = date
    .toLocaleDateString("fa-IR-u-ca-persian")
    .split("/")
    .map((val) => toPersianDigits(val.padStart(2, "0")));

  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${time} - ${year}/${month}/${day}`;
}

export const vehicleMap = {
  Airplane: {
    label: "هواپیما",
    icon: (
      <PiAirplane className="-rotate-45 text-[18px] sm:text-[20px] text-(--color-text)" />
    ),
  },
  Bus: {
    label: "اتوبوس",
    icon: <FaBus className="text-[18px] sm:text-[20px] text-(--color-text)" />,
  },
  SUV: {
    label: "آفرود",
    icon: (
      <FaTruckMonster className="text-[18px] sm:text-[20px] text-(--color-text)" />
    ),
  },
  Van: {
    label: "ون",
    icon: (
      <FaVanShuttle className="text-[18px] sm:text-[20px] text-(--color-text)" />
    ),
  },
  Ship: {
    label: "کشتی",
    icon: <LuShip className="text-[18px] sm:text-[20px] text-(--color-text)" />,
  },
};
