import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Footer.module.css";
import FooterItem from "./FooterItem";
import LinkFooter from "./LinkFooter";
import { toPersianDigits } from "@/utils/formatDate";

const images = [
  "/images/footer/aira.webp",
  "/images/footer/samandehi.webp",
  "/images/footer/ecunion.webp",
  "/images/footer/passenger.webp",
  "/images/footer/state-airline.webp",
];

function Footer() {
  const router = useRouter();
  
  return (
    <>
      <footer
        className={`${styles.footer} ${
          router.pathname === "/"
            ? "lg:border-t lg:border-t-(--color-border) "
            : ""
        }`}
      >
        <div
          className={`${
            router.pathname === "/" ? "block" : "hidden"
          } max-w-[1188px] mx-[1rem] xl:mx-auto py-10 border-t border-t-(--color-border) lg:border-t-0
      grid grid-cols-1 sm:grid-cols-3 gap-y-5  sm:gap-x-3 sm:gap-y-0`}
        >
          <FooterItem
            image="/images/footer/best-price.webp"
            title="بصرفه ترین قیمت"
            description="بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید."
          />
          <FooterItem
            image="/images/footer/support.webp"
            title="پشتیبانی"
            description="پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما."
          />
          <FooterItem
            image="/images/footer/user-satisfaction.webp"
            title="رضایت کاربران"
            description="رضایت بیش از 10هزار کاربر از تور های ما. "
          />
        </div>
        <div
          className="max-w-[1188px] mx-[1rem] xl:mx-auto border-t border-dashed sm:border-solid border-t-(--color-border) py-3
       grid grid-cols-2 lg:grid-cols-6"
        >
          <LinkFooter
            title="تورینو"
            linkArray={[
              { href: "/about-us", text: "درباره ما" },
              { href: "/contact-us", text: "تماس با ما" },
              { href: "/travel-services", text: "چرا تورینو" },
              { href: "/travel-services", text: "بیمه مسافرتی" },
            ]}
          />
          <LinkFooter
            title="خدمات مشتریان"
            linkArray={[
              { href: "/", text: "پشتیبانی آنلاین" },
              { href: "/", text: "راهنمای خرید" },
              { href: "/", text: "راهنمای استرداد" },
              { href: "/", text: "پرسش و پاسخ" },
            ]}
          />
          <div className="col-span-2 sm:col-span-4 flex flex-row-reverse sm:flex-col items-end justify-between mt-5 sm:mt-0">
            <div className="flex flex-col gap-3 w-[50%] sm:w-full items-end my-auto">
              <Image
                src="/logo.webp"
                alt="logo"
                className="w-[100px] h-[30px] sm:w-[146px] sm:h-[44px] "
                width={1000}
                height={600}
                priority
              />
              <p className="text-[14px] sm:text-[15px]">
                {toPersianDigits("تلفن پشتیبانی: ")}
                {toPersianDigits("8574-021")}
              </p>
            </div>
            <div className="w-[50%] sm:w-full flex flex-wrap sm:flex-row-reverse gap-4 sm:gap-5 my-auto sm:mt-3  ">
              {images.map((img, index) => (
                <div
                  className="w-[34px] h-[38px] sm:w-[68px] sm:h-[74px]"
                  key={index}
                >
                  <Image
                    src={img}
                    alt="logo"
                    className="w-full h-full "
                    width={1000}
                    height={600}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <div className={`${styles.end_footer} mx-auto px-[1rem] xl:px-0`}>
        <div className="border-t border-t-(--color-border)">
          <p className="text-black text-[12px] sm:text-[15px] py-2 text-center">
            کلیه حقوق این وب سایت متعلق به تورینو میباشد.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
