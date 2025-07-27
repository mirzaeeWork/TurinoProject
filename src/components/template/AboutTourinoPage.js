import React from 'react'

function AboutTourinoPage() {
  const features = [
    "پشتیبانی ۲۴ ساعته در تمام مراحل سفر، از مشاوره تا بازگشت",
    "همکاری با معتبرترین آژانس‌ها، خطوط هوایی و هتل‌های بین‌المللی",
    "برنامه‌ریزی سفرها به‌صورت شخصی‌سازی‌شده بر اساس سلیقه و بودجه مسافر",
    "تضمین شفافیت کامل در قیمت‌گذاری و عدم وجود هزینه‌های پنهان",
    "برگزاری تورهای اختصاصی خانوادگی، گروهی و ماجراجویانه",
    "ارائه خدمات بیمه مسافرتی معتبر و مشاوره ویزا برای تمامی مقاصد",
    "بهره‌مندی از تیم متخصص با بیش از ۱۰ سال تجربه در صنعت گردشگری",
  ];

  return (
    <section className="lg:max-w-5xl mx-auto px-[1rem] py-10 sm:py-20 space-y-10 min-h-[68vh]">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-(--color-link)">درباره تورینو</h1>
        <p className="leading-7 text-justify tracking-tight text-base sm:text-lg ">
          تورینو، برند تخصصی در حوزه گردشگری و سفر، با هدف ایجاد تجربه‌ای فراتر از سفر برای گردشگران ایرانی تأسیس شده است.
          در دنیای پرشتاب امروز، ما باور داریم که سفر تنها جابه‌جایی فیزیکی نیست، بلکه فرصتی برای کشف فرهنگ‌ها، آرامش ذهن و خلق خاطراتی فراموش‌نشدنی است.
          ما در تورینو تلاش می‌کنیم با ارائه خدمات حرفه‌ای، تورهای متنوع و مشاوره صادقانه، این تجربه را برای شما دلپذیرتر، ایمن‌تر و به‌یادماندنی‌تر کنیم.
        </p>
        <p className=" text-justify tracking-tight leading-7 text-base sm:text-lg">
          از اولین لحظه‌ای که تصمیم به سفر می‌گیرید، تیم ما در کنار شماست؛ از مشاوره مقصد، دریافت ویزا، رزرو هتل و بلیت، تا پشتیبانی در طول سفر.
          هدف ما نه فقط فروش یک تور، بلکه ساختن رابطه‌ای بلندمدت با مسافران وفاداری است که به کیفیت خدمات و صداقت ما اعتماد دارند.
        </p>
      </div>

      <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-(--color-link)">چرا تورینو را انتخاب کنید؟</h2>
        <ul className="list-disc rtl:pr-5 rtl:pl-0 space-y-2 leading-6  text-sm sm:text-base ">
          {features.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>)
}

export default AboutTourinoPage