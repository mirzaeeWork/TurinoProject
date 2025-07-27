import { RiEdit2Line } from "react-icons/ri";
import { useFormik } from "formik";
import DynamicInput from "@/components/element/DynamicInput";
import ButtonElement from "@/components/element/ButtonElement";
import PropertyProfile from "./Property";
import { toPersianDigits } from "@/utils/formatDate";

function BankAccountInfo({
  profile,
  isPending,
  isInputsOpen,
  setIsInputsOpen,
  updateProfile,
}) {
  const formik = useFormik({
    initialValues: {
      shaba_code: profile?.payment?.shaba_code || "",
      debitCard_code: profile?.payment?.debitCard_code || "",
      accountIdentifier: profile?.payment?.accountIdentifier || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const profileData = {
        ...profile,
        payment: {
          shaba_code: formik.values.shaba_code,
          debitCard_code: formik.values.debitCard_code,
          accountIdentifier: formik.values.accountIdentifier,
        },
      };
      updateProfile(profileData, "BankAccountInfo");
    },
    validateOnMount: true,
  });

  const updatMyProfile = (isFlag) => {
    if (!isFlag) {
      formik.resetForm();
    }

    setIsInputsOpen((prev) => ({
      ...prev,
      BankAccountInfo: isFlag,
    }));
  };

  return (
    <section className="border border-(--color-border) rounded-[10px] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px]">اطلاعات حساب بانکی</h3>

        <ButtonElement
          className={`text-[14px] text-[#009ECA] cursor-pointer
            ${
              isInputsOpen.BankAccountInfo
                ? "opacity-0 max-h-0 pointer-events-none"
                : "opacity-100 max-h-auto"
            }`}
          onClick={() => updatMyProfile(true)}
          icon={<RiEdit2Line className="text-[16px]" />}
          text="ویرایش اطلاعات"
        />
      </div>

      {/* اطلاعات نمایش داده شده (read-only) */}
      <div
        className={`w-full transition-all duration-300 ease-in-out grid grid-cols-1 lg:grid-cols-2 gap-y-4 px-3
          ${
            isInputsOpen.BankAccountInfo
              ? "opacity-0 max-h-0 pointer-events-none"
              : "opacity-100 max-h-auto"
          }`}
      >
        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="شماره شبا"
          title={toPersianDigits(profile?.payment?.shaba_code || "_")}
          span_first="col-span-1"
          span_second="sm:col-span-2 break-all"
        />
        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="شماره کارت"
          title={toPersianDigits(profile?.payment?.debitCard_code || "_")}
          span_first="col-span-1"
          span_second="sm:col-span-2 break-all"
        />
        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="شماره حساب"
          title={toPersianDigits(profile?.payment?.accountIdentifier || "_")}
          span_first="col-span-1"
          span_second="sm:col-span-2 break-all"
        />
      </div>

      {/* فرم ویرایش */}
      <form
        onSubmit={formik.handleSubmit}
        className={`transition-all duration-300 ease-in-out w-full
          ${
            isInputsOpen.BankAccountInfo
              ? "opacity-100 max-h-auto"
              : "opacity-0 max-h-0 pointer-events-none overflow-hidden"
          }`}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-3">
          <div className="w-full">
            <DynamicInput
              placeholder="شماره شبا"
              type="text"
              id="shaba_code"
              name="shaba_code"
              value={formik.values.shaba_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.shaba_code}
              error={formik.errors.shaba_code}
              className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text) px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
            />
          </div>
          <div className="w-full">
            <DynamicInput
              placeholder="شماره کارت"
              type="text"
              id="debitCard_code"
              name="debitCard_code"
              value={formik.values.debitCard_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.debitCard_code}
              error={formik.errors.debitCard_code}
              className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text) px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
            />
          </div>
          <div className="w-full">
            <DynamicInput
              placeholder="شماره حساب"
              type="text"
              id="accountIdentifier"
              name="accountIdentifier"
              value={formik.values.accountIdentifier}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.accountIdentifier}
              error={formik.errors.accountIdentifier}
              className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text) px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
            />
          </div>
        </div>

        <div className="border-b border-(--color-border) mb-4" />

        <div className="flex justify-end gap-4">
          <ButtonElement
            type="submit"
            className="w-[144px] text-center bg-(--color-link) h-[43px] text-white text-[16px]"
            isPending={isPending}
            text="تایید"
          />

          <ButtonElement
            type="button"
            className="w-[144px] border border-(--color-link) h-[43px] text-(--color-link) text-[16px] "
            onClick={() => updatMyProfile(false)}
            text="انصراف"
          />
        </div>
      </form>
    </section>
  );
}

export default BankAccountInfo;
