import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { FiPhone } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { LuVolume1 } from "react-icons/lu";
import { BsAirplane } from "react-icons/bs";
import { RiHome3Fill } from "react-icons/ri";
import Auth from "./Auth";
import HeaderLogin from "./HeaderLogin";
import LinkItem from "../../element/LinkItem";

export default function Header() {
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);

  const togglePanel = () => {
    setIsOpenMenuMobile(true);
  };

  const closePanel = () => {
    setIsOpenMenuMobile(false);
  };

  const toggleAuth = () => {
    setIsOpenAuth(true);
  };

  const closeAuth = () => {
    setIsOpenAuth(false);
  };

  return (
    <>
      {/* desktop */}
      <header className={styles.header_desktop}>
        <div className={styles.header__container}>
          <div className="flex gap-16">
            <Image
              src="/logo.webp"
              alt="logo"
              className="w-[146px] h-[44px]"
              width={1000}
              height={600}
              priority
            />
            <ul className={styles.nav}>
              <li>
                <LinkItem href="/" path="/" title="صفحه اصلی" customclassName="!text-[18px]"/>
              </li>
              <li>
                <LinkItem
                  href="/travel-services"
                  path="/travel-services"
                  title="خدمات گردشگری"
                            customclassName="!text-[18px]"

                />
              </li>
              <li>
                <LinkItem href="/about-us" path="/about-us" title="درباره ما" customclassName="!text-[18px]"/>
              </li>
              <li>
                <LinkItem
                  href="/contact-us"
                  path="/contact-us"
                  title="تماس با ما"
                  customclassName="!text-[18px]"
                />
              </li>
            </ul>
          </div>
          <Auth toggleAuth={toggleAuth}/>

        </div>
      </header>
      {/* mobile */}
      <header className={styles.header_mobile}>
        <IoMdMenu className="w-[24px] h-[24px]" onClick={togglePanel} />
        <Auth toggleAuth={toggleAuth}/>

        <div
          className={`${styles.overlay} ${
            isOpenMenuMobile ? styles.active : ""
          }`}
          onClick={closePanel}
        ></div>

        <div
          className={`${styles["slide-panel"]} ${
            isOpenMenuMobile ? styles.active : ""
          }`}
        >
          <ul className="text-white flex flex-col  p-4 gap-4">
            <li onClick={closePanel}>
              <LinkItem
                href="/"
                path="/"
                title="صفحه اصلی"
                icons={<RiHome3Fill className="w-[16px] h-[16px]" />}
              />
            </li>
            <li onClick={closePanel}>
              <LinkItem
                href="/travel-services"
                path="/travel-services"
                title="خدمات گردشگری"
                icons={<BsAirplane className="w-[16px] h-[16px]" />}
              />
            </li>
            <li onClick={closePanel}>
              <LinkItem
                href="/about-us"
                path="/about-us"
                title="درباره ما"
                icons={<LuVolume1 className="w-[16px] h-[16px]" />}
              />
            </li>
            <li onClick={closePanel}>
              <LinkItem
                href="/contact-us"
                path="/contact-us"
                title="تماس با ما"
                icons={<FiPhone className="w-[16px] h-[16px]" />}
              />
            </li>
          </ul>
        </div>
      </header>
      <HeaderLogin
        isOpenAuth={isOpenAuth}
        toggleAuth={toggleAuth}
        closeAuth={closeAuth}
      />
    </>
  );
}
