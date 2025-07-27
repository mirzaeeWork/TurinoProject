import Image from "next/image";

function FooterItem({ image, title,description }) {
  return (
    <div className="flex gap-x-1">
      <div className="w-[71px] h-[64px] sm:w-[95px] sm:h-[80px] lg:w-[120px] lg:h-[105px]">
        <Image
          src={image}
          className="w-full h-full"
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-medium text-[20px] lg:text-[26px] ">{title}</h3>
        <p className="text-sm lg:text-base font-light">{description}</p>
      </div>
    </div>
  );
}

export default FooterItem;
