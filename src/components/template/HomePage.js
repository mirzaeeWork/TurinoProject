import Image from "next/image";
import styles from "./HomePage.module.css";
import TourList from "../module/home/TourList";
import WhyTorino from "../module/home/WhyTorino";
import TravelSearchBox from "../module/home/TravelSearchBox";
import PhoneOrderBanner from "../module/home/PhoneOrderBanner";
import useDynamicQuery from "@/hooks/useDynamicQuery";

function HomePage({ allTours, setAllTours,CITY_LIST,DESTINATION_LIST }) {

  const { mutate, isPending } = useDynamicQuery({
    mode: "mutation",
    method: "get",
    url: "/tour",
  });

  return (
    <>
      <div className="w-full mb-[5rem]">
        <Image
          className={styles.homeHero_img}
          src="/images/home/homeHero.webp"
          width={3000}
          height={2000}
          alt="homeHero"
          priority
        />
        <h1 className="text-center text-base lg:text-[28px] font-semibold mt-4">
          <span className="text-(--color-link)">تورینو</span> برگزار کننده
          بهترین تور های داخلی و خارجی
        </h1>
        <TravelSearchBox
          setAllTours={setAllTours}
          mutate={mutate}
          isPending={isPending}
          CITY_LIST={CITY_LIST} DESTINATION_LIST={DESTINATION_LIST}
        />
        <TourList allTours={allTours} isPending={isPending} />
        <PhoneOrderBanner />
        <WhyTorino />
      </div>
    </>
  );
}

export default HomePage;
