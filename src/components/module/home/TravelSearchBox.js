import { useEffect, useState } from "react";
import styles from "./TravelSearchBox.module.css";
import LocationSelector from "./LocationSelector";
import DateSelector from "./DateSelector";
import { IoLocationOutline } from "react-icons/io5";
import { TbWorldSearch } from "react-icons/tb";
import { toast } from "react-toastify";
import { formatDate, isAfterDay } from "@/utils/formatDate";
import useDynamicQuery from "@/hooks/useDynamicQuery";
import { useRouter } from "next/router";
import { DateObject } from "react-multi-date-picker";
import ButtonElement from "@/components/element/ButtonElement";

const initialFormState = {
  selectedOrigin: "",
  selectedDestination: "",
  fromDate: null,
  toDate: null,
};

function TravelSearchBox({ setAllTours, mutate, isPending }) {
  const [formState, setFormState] = useState(initialFormState);
  const [oneLoading,setOneLoading]=useState(false)
  const router = useRouter();

  const { data: CITY_LIST, isLoading: isLoading_CITY } = useDynamicQuery({
    mode: "query",
    url: `/cities/origins?faName=${formState.selectedOrigin}`,
    queryKey: ["cities", "origins"],
  });

  const { data: DESTINATION_LIST, isLoading: isLoading_DESTINATION } =
    useDynamicQuery({
      mode: "query",
      url: `/cities/destinations?faName=${formState.selectedOrigin}`,
      queryKey: ["cities", "destinations"],
    });

  useEffect(() => {
    const { originId, destinationId, startDate, endDate } = router?.query;

    const origin = originId
      ? CITY_LIST?.find((item) => item._id === originId)
      : "";
    const destination = destinationId
      ? DESTINATION_LIST?.find((item) => item._id === destinationId)
      : "";

    setFormState((prev) => ({
      ...prev,
      selectedOrigin: origin,
      selectedDestination: destination,
      fromDate: startDate ? new DateObject(startDate) : null,
      toDate: endDate ? new DateObject(endDate) : null,
    }));

    handleSearchWithoutPush({
      originId,
      destinationId,
      startDate,
      endDate,
    });
  }, [router.query, CITY_LIST, DESTINATION_LIST]);

  const updateCitySelection = (type, city) => {
    const selectedOrigin = type === "origin" ? city : formState.selectedOrigin;
    const selectedDestination =
      type === "destination" ? city : formState.selectedDestination;

    if (
      selectedOrigin &&
      selectedDestination &&
      selectedOrigin.faName === selectedDestination.faName
    ) {
      toast.error("مبدا و مقصد نمی‌توانند یکسان باشند");

      setFormState((prev) => ({
        ...prev,
        [type === "origin" ? "selectedOrigin" : "selectedDestination"]: null,
        showOriginList: false,
        showDestinationList: false,
      }));

      return;
    }

    setFormState((prev) => ({
      ...prev,
      [type === "origin" ? "selectedOrigin" : "selectedDestination"]: city,
      showOriginList: false,
      showDestinationList: false,
    }));
  };

  const updateDate = (key, date) => {
    const newFromDate = key === "fromDate" ? date : formState.fromDate;
    const newToDate = key === "toDate" ? date : formState.toDate;

    if (newFromDate && newToDate && isAfterDay(newFromDate, newToDate)) {
      toast.error("تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد");
      setFormState((prev) => ({
        ...prev,
        fromDate: newToDate,
        toDate: null,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [key]: date,
      }));
    }
  };

  const validateForm = () => {
    const { selectedOrigin, selectedDestination, fromDate, toDate } = formState;

    if (
      selectedOrigin &&
      selectedDestination &&
      selectedOrigin.faName === selectedDestination.faName
    ) {
      toast.error("مبدا و مقصد نمی‌توانند یکسان باشند");
      return false;
    }

    if (fromDate && toDate && isAfterDay(fromDate, toDate)) {
      toast.error("تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد");
      return false;
    }

    return true;
  };

  const handleSearchWithoutPush = (query) => {
    mutate(query, {
      onSuccess: (data) =>  setAllTours(data),
      onError: (error) => {
        const text =
          error?.response?.data?.message === "Access token required"
            ? "ابتدا وارد سایت شوید"
            : error?.response?.data?.message;
        toast.error(text || error?.message);
      },
    });
  };

  const handleSearch = () => {
    if (!validateForm()) return;
    setOneLoading(true)

    const { selectedOrigin, selectedDestination, fromDate, toDate } = formState;
    // console.log({ selectedOrigin, selectedDestination, fromDate, toDate });

    const query = {
      ...(selectedOrigin?._id && { originId: selectedOrigin._id }),
      ...(selectedDestination?._id && { destinationId: selectedDestination._id }),
      ...(fromDate && { startDate: formatDate(fromDate) }),
      ...(toDate && { endDate: formatDate(toDate) }),
    };

    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });

    handleSearchWithoutPush(query);
  };

  return (
    <section className="mx-4 sm:w-[95%] md:w-[90%] lg:w-[874px] grid grid-cols-2 sm:grid-cols-5 gap-x-3.5 gap-y-4.5 sm:gap-0 sm:border border-[#e0e0e0] rounded-2xl sm:mx-auto mt-5 py-2">
      <LocationSelector
        title="مبدا"
        className={`${styles.border_left_custom} py-2`}
        icon={<IoLocationOutline />}
        cityList={CITY_LIST}
        selected={formState.selectedOrigin}
        onSelect={(city) => updateCitySelection("origin", city)}
      />

      <LocationSelector
        title="مقصد"
        className={`${styles.border_left_custom} py-2`}
        icon={
          <TbWorldSearch className="!text-[#2C2C2C] lg:!w-[18px] lg:!h-[18px]" />
        }
        cityList={DESTINATION_LIST}
        selected={formState.selectedDestination}
        onSelect={(city) => updateCitySelection("destination", city)}
      />

      <DateSelector
        value={formState.fromDate}
        className={`${styles.border_left_custom} col-span-2 sm:col-span-1 py-2`}
        onChange={(date) => updateDate("fromDate", date)}
        placeHolder="از تاریخ"
        isFutureOnly={true}
        topOffsetClass="top-default"
        classNameDP="placeholder-[#2C2C2C] text-base sm:text-lg lg:text-xl"
      />

      <DateSelector
        value={formState.toDate}
        className={`${styles.border_left_custom} ${styles.lastChild} col-span-2 sm:col-span-1 py-2`}
        onChange={(date) => updateDate("toDate", date)}
        placeHolder="تا تاریخ"
        isFutureOnly={true}
        topOffsetClass="top-default"
        classNameDP="placeholder-[#2C2C2C] text-base sm:text-lg lg:text-xl"
      />

      <div className="col-span-2 sm:col-span-1 text-center">
        <ButtonElement
          className="bg-(--color-link) text-xl lg:text-2xl w-full sm:w-[90%] h-[37px] sm:h-full rounded-2xl text-white"
          onClick={handleSearch}
          isPending={isPending && oneLoading}
          text="جستجو"
        />        
      </div>
    </section>
  );
}

export default TravelSearchBox;
