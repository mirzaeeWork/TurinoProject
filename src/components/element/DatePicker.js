import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DateObject from "react-date-object";

function SolarDatePicker({
  value,
  onChange,
  placeHolder,
  isFutureOnly = false,
  onBlur,
  topOffsetClass,
  classNameDP,
}) {
  const [today, setToday] = useState(null);

  useEffect(() => {
    setToday(new DateObject({ calendar: persian, locale: persian_fa }));
  }, []);

  return (
    <div className={`DatePicker ${topOffsetClass}`}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        onChange={onChange}
        value={value}
        onClose={onBlur}
        format="YYYY/MM/DD"
        calendarPosition="bottom-center"
        onOpenPickNewDate={false}
        autoFocus={false}
        minDate={isFutureOnly ? today : null}
        placeholder={placeHolder}
        inputClass={`w-[90%] focus:outline-none  text-[#2C2C2C] ${classNameDP}`}
        className="green mobile "
        containerClass="w-full z-50 shadow-md"
        mapDays={({ date }) => {
          if (isFutureOnly && date < today) {
            return {
              disabled: true,
              style: {
                color: "#ccc",
                backgroundColor: "#f7f7f7",
                textDecoration: "line-through",
              },
            };
          }
        }}
      />
    </div>
  );
}

export default SolarDatePicker;
