import {
  FaMapMarkedAlt,
  FaHotel,
  FaBusAlt,
  FaPassport,
  FaGlobe,
} from "react-icons/fa";

function TourinoServicesPage() {
  const services = [
    { icon: <FaMapMarkedAlt className="text-(--color-link)" />, title: "تورهای متنوع داخلی و خارجی" },
    { icon: <FaHotel className="text-(--color-link)" />, title: "رزرو انواع اقامتگاه و هتل" },
    { icon: <FaBusAlt className="text-(--color-link)" />, title: "خدمات حمل‌ونقل بین‌شهری و فرودگاهی" },
    { icon: <FaPassport className="text-(--color-link)" />, title: "مشاوره و دریافت ویزا" },
    { icon: <FaGlobe className="text-(--color-link)" />, title: "راهنمای فارسی‌زبان در سفرهای خارجی" },
  ];

  return (
    <section className="lg:max-w-5xl mx-auto px-[1rem] py-10 sm:py-20 space-y-10  min-h-[68vh]">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-(--color-link)">خدمات گردشگری تورینو</h1>
        <p className=" leading-relaxed">
          تورینو، همراه مطمئن شما در سفرهای داخلی و خارجی، با بهترین خدمات تور، اقامت، حمل‌ونقل و مشاوره سفر.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-4  bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="text-xl lg:text-3xl">{item.icon}</div>
            <div className="text-base lg:text-lg font-medium ">{item.title}</div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default TourinoServicesPage
