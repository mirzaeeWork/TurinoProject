import StackGallery from "./StackGallery";

const images = [
  "/images/home/whyTour/1.png",
  "/images/home/whyTour/2.png",
  "/images/home/whyTour/3.png",
  "/images/home/whyTour/4.png",
];

export default function WhyTorino() {

  return (
    <section className="max-w-[1188px] mx-auto px-[1rem] xl:px-0 pt-20 flex flex-col sm:flex-row justify-between items-center gap-5 lg:gap-10">
      {/* بخش متنی */}
      <div className="sm:w-[40%] lg:w-[50%] sm:space-y-4 ">
        <h3 className="flex gap-2">
          <span className="w-[34px] h-[34px] lg:w-[50px] lg:h-[50px] rounded-full bg-[linear-gradient(135deg,_#28A745,_#10411B)] 
          flex items-center justify-center text-white text-[24px] lg:text-[40px]">
            <span className="mt-2"> ؟</span>
          </span>

          <span className="text-[24px] lg:text-[40px] text-(--color-text) font-extrabold">
            چرا <span className="text-(--color-link)">تورینو</span> ؟
          </span>
        </h3>
        <h4 className="hidden sm:block text-[18px] lg:text-[24px] font-medium">تور طبیعت‌گردی و تاریخی</h4>
        <p className="hidden sm:block text-[15px] lg:text-[20px] leading-8 text-justify tracking-tight">
          اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
          طبیعت چادر بزنید یا در یک اقامتگاه بوم‌گردی اتاق بگیرید، باید تورهای
          طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
          آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی
          را خریداری کنید.
        </p>
      </div>

      {/* اسلایدر با افکت Cards */}
      <StackGallery />
    </section>
  );
}
