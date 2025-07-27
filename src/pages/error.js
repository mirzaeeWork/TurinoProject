// pages/error.js
import Image from "next/image";

function ErrorPage({ statusCode }) {
  return (
    <div className="max-w-[1188px] mx-auto px-[1rem] xl:px-0 flex flex-col-reverse sm:flex-row items-center justify-evenly py-20 sm:py-0 h-[100vh]">
      <div className="mt-5 sm:mt-0">
        {statusCode === 500 ? (
          <>
            <h3 className="text-[24px] sm:text-[26px] lg:text-[36px] font-semibold mb-3">
              اتصال با سرور برقرار نیست!
            </h3>
            <p className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold text-center sm:text-start">
              لطفا بعدا دوباره امتحان کنید.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-[24px] sm:text-[27px] lg:text-[36px] font-semibold mb-3">
              خطایی رخ داده است
            </h3>
            <p className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold ">
              کد خطا: {statusCode}
            </p>
          </>
        )}
      </div>
      <div className="w-[240px] h-[240px] sm:w-[350px] sm:h-[350px]">
        <Image
          src="/images/ErrorApi.webp"
          className="w-full h-full"
          alt="Not Found"
          width={1000}
          height={800}
          priority
        />
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

ErrorPage.getLayout = function PageLayout(page) {
  return page; // بدون Layout
};

export default ErrorPage;
