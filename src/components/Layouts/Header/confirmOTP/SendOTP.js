import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IoIosClose } from "react-icons/io";
import { toPersianDigits } from "@/utils/formatDate";
import LoadingForButton from "@/components/element/LoadingForButton";
import DynamicInput from "@/components/element/DynamicInput";
import ButtonElement from "@/components/element/ButtonElement";

const validationSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("وارد کردن شماره موبایل الزامی است"),
});

function SendOTP({
  formState,
  setFormState,
  closeAuth,
  OpenPageConfirmCode,
  isPending,
}) {
  const formik = useFormik({
    initialValues: { mobile: formState?.mobile || "" },
    validationSchema,
    onSubmit: (values) => {
      setFormState((prev) => ({ ...prev, mobile: values.mobile }));
      OpenPageConfirmCode();
      // console.log(value)
    },
    enableReinitialize: true,
    validateOnMount: true,
  });

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (/^0?$|^09\d{0,9}$/.test(value)) {
      setFormState((prev) => ({ ...prev, mobile: value }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="relative w-full"
    >
      <IoIosClose
        className="absolute top-1.5 -left-1 text-[24px]"
        onClick={closeAuth}
      />
      <h3 className="text-[22px] sm:text-[28px] font-semibold pt-9 text-center ">
        ورود به تورینو
      </h3>
      <label htmlFor="mobile" className="font-light mt-5">
        شماره موبایل خود را وارد کنید
      </label>
      <DynamicInput
        className="w-full p-2 placeholder:font-light border border-(--color-border) rounded-[6px] outline-none"
        placeholder={`${toPersianDigits("4567")}****${toPersianDigits("0912")}`}
        type="text"
        id="mobile"
        name="mobile"
        value={formik.values.mobile}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.mobile}
        error={formik.errors.mobile}
      />

      <ButtonElement
        type="submit"
        className="w-full pt-2.5 pb-2 text-center bg-(--color-link) my-5 text-white text-[18px] "
        isPending={isPending}
        text="ارسال کد تایید"
      />
    </form>
  );
}

export default SendOTP;
