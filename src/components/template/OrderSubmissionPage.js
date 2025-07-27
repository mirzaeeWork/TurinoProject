import { useFormik } from "formik";
import * as Yup from "yup";
import PassengerForm from "../module/order-submission/PassengerForm";
import SubmitAction from "../module/order-submission/SubmitAction";
import { useRouter } from "next/router";
import useDynamicQuery from "@/hooks/useDynamicQuery";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/formatDate";

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

function OrderSubmissionPage({ basket, profile }) {
  const router = useRouter();

  const { mutate: mutateProfile, isPending: isUpdateProfile } = useDynamicQuery(
    {
      mode: "mutation",
      method: "put",
      url: "/user/profile",
    }
  );

  const { mutate: mutateOrder, isPending: isUpdateOrder } = useDynamicQuery({
    mode: "mutation",
    method: "post",
    url: "/order",
  });

  const submitHandler = (values) => {
    const value = { ...values, birthDate: formatDate(values.birthDate) };
    mutateProfile(value, {
      onSuccess: (data) => {
        const user = data?.user;
        const profile = {
          nationalCode: user?.nationalCode,
          fullName: user?.firstName + " " + user?.lastName,
          gender: user?.gender,
          birthDate: user?.birthDate,
        };

        mutateOrder(profile, {
          onSuccess: (data) => {
            toast.success(data.message);
            router.replace(`/successful-payment`);
          },
          onError: (error) => {
            const text =
              error?.response?.data?.message === "Access token required"
                ? "ابتدا وارد سایت شوید"
                : error?.response?.data?.message;
            toast.error(text || error?.message);
          },
        });
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
      id: profile?.id || "",
      mobile: profile?.mobile || "",
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      nationalCode: profile?.nationalCode || "",
      birthDate: profile?.birthDate ? new Date(profile?.birthDate) : null,
      gender: profile?.gender || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="px-[1rem] xl:px-0 pt-5 pb-10 lg:h-[65vh] sm:flex md:items-center sm:bg-[#F3F3F3]"
    >
      <div className="max-w-[1188px] mx-auto p-[1rem]  grid grid-cols-1 lg:grid-cols-[2.8fr_1fr] gap-4">
        <PassengerForm formik={formik} />
        <SubmitAction
          basket={basket}
          isUpdateProfile={isUpdateProfile}
          isUpdateOrder={isUpdateOrder}
        />
      </div>
    </form>
  );
}

export default OrderSubmissionPage;
