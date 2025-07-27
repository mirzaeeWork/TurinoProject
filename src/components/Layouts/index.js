import ScrollToTopButton from "../element/ScrollToTopButton";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Layuot({ children }) {
  return (
    <>
      <Header />
      <div className="mt-[64px] lg:mt-[74px] ">{children}</div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}


// const phoneRegExp = /^(0|\+98)?9[0-9]{9}$/;
// const phoneRegExp = /^(0|\+98)?9[0-9]{9}$/;
// const regEx = /^(09\d{9})$/gs;
