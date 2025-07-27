import DynamicInput from "@/components/element/DynamicInput";
import { TbUserFilled } from "react-icons/tb";
import DateSelector from "../home/DateSelector";
import CustomSelect from "@/components/element/CustomSelect";
import Loading from "@/components/element/Loading";

function PassengerForm({ formik }) {


  return (
    <div className=" w-full mx-auto p-4 pb-0 bg-white rounded-[10px] border border-(--color-border)">
      <h3 className="text-[24px] font-bold flex items-center gap-2">
        <TbUserFilled className="text-[16px] sm:text-[22px]" />
        مشخصات مسافر
      </h3>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 mt-4">
        <div>
          <DynamicInput
            className="w-full text-[14px] sm:text-[16px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-4 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
            placeholder="نام "
            type="text"
            name="firstName"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.firstName}
            error={formik.errors.firstName}
          />
        </div>

                <div>
          <DynamicInput
            className="w-full text-[14px] sm:text-[16px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-4 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
            placeholder="نام خانوادگی "
            type="text"
            name="lastName"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.lastName}
            error={formik.errors.lastName}
          />
        </div>



        <div>
          <DynamicInput
            className="w-full text-[14px] sm:text-[16px] border border-(--color-border) rounded-[5px] text-(--color-text)
            px-4 py-2.5 focus:outline-none placeholder-(--color-placeHolder)"
            type="text"
            placeholder="کدملی"
            name="nationalCode"
            id="nationalCode"
            value={formik.values.nationalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.nationalCode}
            touched={formik.touched.nationalCode}
          />
        </div>

        <div>
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
        </div>
        <div>
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
    </div>
  );
}

export default PassengerForm;
