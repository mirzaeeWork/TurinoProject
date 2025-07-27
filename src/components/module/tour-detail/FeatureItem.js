import Image from "next/image";

export default function FeatureItem  ({ icon, label }) {
    return (
  <span className="flex items-center gap-1.5 justify-center">
    {typeof icon === "string" ? (
      <Image
        className="w-[14px] h-[14px] md:w-[24px] md:h-[24px]"
        src={icon}
        alt={label}
        width={1000}
        height={1000}
      />
    ) : (
      icon
    )}
    <span className="ml-1">{label}</span>
  </span>
);
}