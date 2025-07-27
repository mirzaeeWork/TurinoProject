import React, { useState } from "react";
import AccountInfo from "../module/dashboard/my-profile/AccountInfo";
import PersonalInfo from "../module/dashboard/my-profile/PersonalInfo";
import BankAccountInfo from "../module/dashboard/my-profile/BankAccountInfo";
import useDynamicQuery from "@/hooks/useDynamicQuery";
import { toast } from "react-toastify";

function MyProfilePage({ dataPProfile }) {
  const [isInputsOpen, setIsInputsOpen] = useState({
    PersonalInfo: false,
    AccountInfo: false,
    BankAccountInfo: false,
  });
  const [profile, setProfile] = useState(dataPProfile);

  const { mutate, isPending } = useDynamicQuery({
    mode: "mutation",
    method: "put",
    url: "/user/profile",
  });

  const updateProfile = (data, isInputsOpen) => {
    if (JSON.stringify(data) === JSON.stringify(profile)) {
      toast.info("هیچ تغییری در اطلاعات ایجاد نشده است.");
      setIsInputsOpen((prev) => ({ ...prev, [isInputsOpen]: false }));
      return;
    }
    mutate(data, {
      onSuccess: (data) => {
        // console.log(data.code);
        toast.success(data.message);
        setIsInputsOpen((prev) => ({ ...prev, [isInputsOpen]: false }));
        setProfile(data.user);
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

  return (
    <div className="grid grid-cols-1 gap-[1rem]">
      <PersonalInfo
        profile={profile}
        isPending={isPending}
        updateProfile={updateProfile}
        isInputsOpen={isInputsOpen}
        setIsInputsOpen={setIsInputsOpen}
      />
      <AccountInfo
        profile={profile}
        isPending={isPending}
        updateProfile={updateProfile}
        isInputsOpen={isInputsOpen}
        setIsInputsOpen={setIsInputsOpen}
      />
      <BankAccountInfo
        profile={profile}
        isPending={isPending}
        updateProfile={updateProfile}
        isInputsOpen={isInputsOpen}
        setIsInputsOpen={setIsInputsOpen}
      />
    </div>
  );
}

export default MyProfilePage;
