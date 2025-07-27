import Image from 'next/image';

export default function TourInfoItem({ icon, label, value, className = "", iconClass = "" }) {
  return (
    <div
      className={`flex flex-col gap-y-1 items-start md:items-center ${className}`}
    >
      <span className="flex items-center text-[16px] md:text-[18px] gap-1">
        <Image
          className={`w-[16px] h-[16px] md:w-[20px] md:h-[20px] ${iconClass}`}
          src={icon}
          alt={label}
          width={1000}
          height={1000}
        />
        {label}
      </span>
      <span className="font-medium text-[14px] md:text-[16px]">{value}</span>
    </div>
  );
}
