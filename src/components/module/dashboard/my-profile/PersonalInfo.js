import { RiEdit2Line } from "react-icons/ri";
import { toPersianDigits } from "@/utils/formatDate";
import * as Yup from "yup";
import { useFormik } from "formik";
import DynamicInput from "@/components/element/DynamicInput";
import ButtonElement from "@/components/element/ButtonElement";
import PropertyProfile from "./Property";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل وارد شده معتبر نیست")
    .required("وارد کردن ایمیل الزامی است"),
});

function PersonalInfo({
  profile,
  isPending,
  isInputsOpen,
  setIsInputsOpen,
  updateProfile,
}) {
  const textBtn = profile?.mobile && profile?.email ? "ویرایش" : "افزودن";

  const formik = useFormik({
    initialValues: { email: profile?.email || "" },
    validationSchema,
    onSubmit: (values) => {
      updateProfile({...profile,...values}, "PersonalInfo");
    },
    enableReinitialize: true,
    validateOnMount: true,
  });

  const updatMyProfile = () => {
    setIsInputsOpen((prev) => ({
      ...prev,
      PersonalInfo: true,
    }));
  };

  return (
    <section className="border border-(--color-border) rounded-[10px] p-4 space-y-4">
      <h3 className="text-[16px]">اطلاعات حساب کاربری</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 px-3">
        <PropertyProfile
          className={`col-span-1 flex justify-between md:justify-start md:gap-3 ${
            !isInputsOpen.PersonalInfo ? "items-center" : "pt-2.5"
          }`}
          label="شماره موبایل"
          title={toPersianDigits(profile?.mobile || "_")}
        />

        <div className="col-span-1 h-auto">
          <div
            className={`w-full transition-all duration-300 ease-in-out
            ${
              isInputsOpen.PersonalInfo
                ? "opacity-0 max-h-0 pointer-events-none"
                : "opacity-100 max-h-auto"
            }`}
          >
            <div className="flex justify-between items-center gap-4">
              <PropertyProfile
                className="flex gap-3 items-center"
                label="ایمیل"
                title={toPersianDigits(profile?.email || "_")}
              />
              <ButtonElement
                className="text-[14px] text-[#009ECA] cursor-pointer"
                onClick={updatMyProfile}
                icon={<RiEdit2Line className="text-[16px]" />}
                text={textBtn}
              />
            </div>
          </div>
            {/* Update Profile */}
          <form
            onSubmit={formik.handleSubmit}
            className={`transition-all duration-300 ease-in-out flex gap-2 w-full
            ${
              isInputsOpen.PersonalInfo
                ? "opacity-100 max-h-auto"
                : "opacity-0 max-h-0 pointer-events-none overflow-hidden"
            }`}
          >
            <div className="w-full">
              <DynamicInput
                className="w-full text-[14px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-2 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
                placeholder="آدرس ایمیل"
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.email}
                error={formik.errors.email}
              />
            </div>
            <ButtonElement
              type="submit"
              className="px-6 bg-(--color-link) h-[43px] text-white text-[16px] "
              isPending={isPending}              
              text="تایید"
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default PersonalInfo;
