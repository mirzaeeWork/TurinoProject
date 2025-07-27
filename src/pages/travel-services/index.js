import HeadManager from "@/components/element/HeadManager";
import TourinoServicesPage from "@/components/template/TourinoServicesPage";

export default function TourinoServices() {
  return (
    <>
      <HeadManager
        title="خدمات مسافرتی | تورینو"
        description="ارائه خدمات حرفه‌ای گردشگری شامل تورهای داخلی و خارجی، رزرو هتل، بلیت و مشاوره سفر"
      />
      <TourinoServicesPage />
    </>
  );
}
