import LinkItem from "@/components/element/LinkItem";
import MyTourIcons from "@/components/icons/MyTourIcons";
import TransactionIcon from "@/components/icons/TransactionIcon";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { TbUserFilled } from "react-icons/tb";

function DashboardLayout({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="max-w-[1188px] mx-auto p-[1rem] sm:py-[2rem] xl:px-0  grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4">
      <section className=" flex justify-between sm:flex-col border-b sm:border border-(--color-border) sm:rounded-[10px] h-fit overflow-hidden">
        <LinkItem
          icons={<TbUserFilled className="text-[16px]  sm:text-[20px]" />}
          href="/dashboard"
          path="/dashboard"
          title="پروفایل"
          customclassName="p-2 sm:p-3 !text-[14px] sm:!text-[16px]"
          customActiv="border-b-2 sm:border-b-0 border-(--color-link) sm:bg-[#28A74540]"
        />
        <div className="hidden sm:block mx-3 border-b border-(--color-border)" />

        <LinkItem
          icons={
            <MyTourIcons
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              color={pathname === "/dashboard/my-tours" ? "#28A745" : "#282828"}
            />
          }
          href="/dashboard/my-tours"
          path="/dashboard/my-tours"
          title="تور های من"
          customclassName="p-2 sm:p-3 !text-[14px] sm:!text-[16px]"
          customActiv="border-b-2 sm:border-b-0 border-(--color-link) sm:bg-[#28A74540]"
        />
        <div className="hidden sm:block mx-3 border-b border-(--color-border)" />

        <LinkItem
          icons={
            <TransactionIcon
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              color={
                pathname === "/dashboard/transactions" ? "#28A745" : "#282828"
              }
            />
          }
          href="/dashboard/transactions"
          path="/dashboard/transactions"
          title="تراکنش ها"
          customclassName="p-2 sm:p-3 !text-[14px] sm:!text-[16px]"
          customActiv="border-b-2 sm:border-b-0 border-(--color-link) sm:bg-[#28A74540]"
        />
      </section>
      <section className="min-h-[63vh]">{children}</section>
    </div>
  );
}

export default DashboardLayout;


