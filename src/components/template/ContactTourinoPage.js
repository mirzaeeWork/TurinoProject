import { useFormik } from "formik";
import * as Yup from "yup";
import DynamicInput from "@/components/element/DynamicInput";
import ButtonElement from "@/components/element/ButtonElement";
import useDynamicQuery from "@/hooks/useDynamicQuery";
import ContactInfoBox from "../module/concat-us/ContactInfoBox";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string().required("عنوان الزامی است"),
  message: Yup.string().required("پیام خود را وارد کنید"),
});

export default function ContactTourinoPage() {
  const { mutate, isPending } = useDynamicQuery({
    mode: "mutation",
    method: "post",
    url: "/contact_us",
  });

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        formik.resetForm();
      },
      onError: (error) => {
        const text =
          error?.response?.data?.message === "Access token required"
            ? "ابتدا وارد سایت شوید"
            : error?.response?.data?.message;
        toast.error(text || error?.message);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="lg:max-w-4xl mx-auto px-[1rem] py-10 sm:py-20 space-y-10 min-h-[68vh]">
      <ContactInfoBox />

      <form
        className=" bg-white p-6 rounded-xl shadow"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <DynamicInput
            className="w-full p-2 placeholder:font-light border border-(--color-border) rounded-[6px] outline-none"
            placeholder="عنوان پیام"
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.title}
            error={formik.errors.title}
          />
        </div>

        <div>
          <textarea
            name="message"
            rows="4"
            placeholder="متن پیام "
            className="w-full resize-none border border-(--color-border) rounded-[6px] p-2 focus:outline-none  placeholder:font-light"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="text-(--color-error) text-[10px] lg:text-[12px] font-normal  h-7">
            {formik.touched.message && formik.errors.message}
          </div>
        </div>

        <div className="text-left sm:text-right">
          <ButtonElement
            type="submit"
            className="w-full bg-(--color-link) h-[43px] text-white text-[16px]"
            isPending={isPending}
            text="ارسال پیام"
          />
        </div>
      </form>
    </section>
  );
}
