import { RiEdit2Line } from "react-icons/ri";
import { toPersianDigits } from "@/utils/formatDate";
import * as Yup from "yup";
import { useFormik } from "formik";
import DynamicInput from "@/components/element/DynamicInput";
import ButtonElement from "@/components/element/ButtonElement";
import PropertyProfile from "./Property";
import DateSelector from "../../home/DateSelector";
import CustomSelect from "@/components/element/CustomSelect";

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  nationalCode: Yup.string()
    .matches(/^\d{10}$/, "کد ملی نامعتبر است")
    .required("کد ملی الزامی است"),
  birthDate: Yup.mixed().required("تاریخ تولد الزامی است"),
  gender: Yup.string()
    .oneOf(["male", "female"], "جنسیت را انتخاب کنید")
    .required("جنسیت الزامی است"),
});

function AccountInfo({
  profile,
  isPending,
  isInputsOpen,
  setIsInputsOpen,
  updateProfile,
}) {
  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      nationalCode: profile?.nationalCode || "",
      birthDate: profile?.birthDate ? new Date(profile?.birthDate) : null,
      gender: profile?.gender || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      updateProfile({...profile,...values}, "AccountInfo");
    },

    validateOnMount: true,
  });

  const updatMyProfile = (isFlag) => {
    if (!isFlag) {
      formik.resetForm();
    }

    setIsInputsOpen((prev) => ({
      ...prev,
      AccountInfo: isFlag,
    }));
  };

  return (
    <section className="border border-(--color-border) rounded-[10px] p-4 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px]">اطلاعات شخصی</h3>

        <ButtonElement
          className={`text-[14px] text-[#009ECA] cursor-pointer
            ${
              isInputsOpen.AccountInfo
                ? "opacity-0 max-h-0 pointer-events-none"
                : "opacity-100 max-h-auto"
            }`}
          onClick={() => updatMyProfile(true)}
          icon={<RiEdit2Line className="text-[16px]" />}
          text="ویرایش اطلاعات"
        />
      </div>

      <div
        className={`w-full transition-all duration-300 ease-in-out grid grid-cols-1 lg:grid-cols-2 gap-y-4 px-3 
            ${
              isInputsOpen.AccountInfo
                ? "opacity-0 max-h-0 pointer-events-none"
                : "opacity-100 max-h-auto"
            }`}
      >
        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="نام و نام خانوادگی"
          title={toPersianDigits(
            profile?.firstName + " " + profile?.lastName || "_"
          )}
          span_first="col-span-1"
          span_second="sm:col-span-2"
        />

        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="کدملی"
          title={toPersianDigits(profile?.nationalCode || "_")}
          span_first="col-span-1"
          span_second="sm:col-span-2"
        />

        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="جنسیت"
          title={toPersianDigits(
            (profile?.gender === "female" ? "زن" : "مرد") || "_"
          )}
          span_first="col-span-1"
          span_second="sm:col-span-2"
        />

        <PropertyProfile
          className={`col-span-1 grid grid-cols-2 sm:grid-cols-3 `}
          label="تاریخ تولد"
          title={
            profile?.birthDate
              ? new Date(profile?.birthDate).toLocaleDateString(
                  "fa-IR-u-ca-persian"
                )
              : "_"
          }
          span_first="col-span-1"
          span_second="sm:col-span-2"
        />
      </div>

      {/* Update Profile */}
      <form
        onSubmit={formik.handleSubmit}
        className={`transition-all duration-300 ease-in-out w-full 
            ${
              isInputsOpen.AccountInfo
                ? "opacity-100 max-h-auto"
                : "opacity-0 max-h-0 pointer-events-none overflow-hidden"
            }`}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-3">
          <div className="w-full">
            <DynamicInput
              className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
              placeholder="نام"
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.firstName}
              error={formik.errors.firstName}
            />
          </div>
          <div className="w-full">
            <DynamicInput
              className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
              placeholder="نام خانوادگی"
              type="text"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.lastName}
              error={formik.errors.lastName}
            />
          </div>{" "}
          <div className="w-full">
            <DynamicInput
              className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
              placeholder="کدملی"
              type="text"
              id="nationalCode"
              name="nationalCode"
              value={formik.values.nationalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.nationalCode}
              error={formik.errors.nationalCode}
            />
          </div>
          <div className="w-full">
            <DateSelector
              value={formik.values.birthDate}
              className="w-full border border-(--color-border) rounded-[5px] px-4 py-2 flex items-center justify-start text-(--color-text)
                        focus:outline-none placeholder-(--color-placeHolder)"
              onChange={(date) => {
                formik.setFieldValue("birthDate", date);
                formik.validateField("birthDate");
              }}
              onBlur={() => {
                formik.setFieldTouched("birthDate", true);
                formik.validateField("birthDate");
              }}
              placeHolder="تاریخ تولد"
              isFutureOnly={false}
              topOffsetClass="top-small"
              classNameDP="placeholder-(--color-placeHolder) text-[14px] sm:text-[16px] text-(--color-text)"
            />
            <div className="text-(--color-error) mt-1 text-[10px] lg:text-[12px] font-normal  h-7">
              {formik.touched.birthDate && formik.errors.birthDate}
            </div>
          </div>{" "}
          <div className="w-full">
            <CustomSelect
              value={formik.values.gender}
              onChange={(val) => formik.setFieldValue("gender", val)}
              onBlur={() => formik.setFieldTouched("gender", true)}
              placeholder="جنسیت"
              options={[
                { label: "جنسیت", value: "", disabled: true },
                { label: "مرد", value: "male" },
                { label: "زن", value: "female" },
              ]}
            />
            <div className="text-(--color-error) mt-1 text-[10px] lg:text-[12px] font-normal  h-7">
              {formik.touched.gender && formik.errors.gender}
            </div>
          </div>
        </div>
        <div className="border-b border-(--color-border) mb-4" />

        <div className=" flex justify-end gap-4">
          <ButtonElement
            type="submit"
            className="w-[144px] text-center bg-(--color-link) h-[43px] text-white text-[16px]"
            isPending={isPending}
            text="تایید"
          />

          <ButtonElement
            className="w-[144px] border border-(--color-link) h-[43px] text-(--color-link) text-[16px] "
            text="انصراف"
            onClick={() => updatMyProfile(false)}
          />
        </div>
      </form>
    </section>
  );
}

export default AccountInfo;
