import HeadManager from "@/components/element/HeadManager";
import DashboardLayout from "@/components/Layouts/DashboardLayout/DashboardLayout";
import MyTransactionsPage from "@/components/template/MyTransactionsPage";
import { checkBackAuth } from "@/utils/Auth";
import connectDB from "@/utils/connectDB";
import { getTransactionsByUserId } from "@/utils/crudModels/Transaction";
import axios from "axios";
import React from "react";

function Transactions({ transactions }) {
  return (
    <>
      <HeadManager
        title="تراکنش‌ها | تورینو"
        description="مشاهده سوابق مالی و تراکنش‌های شما در آژانس تورینو"
      />
      <DashboardLayout>
        <MyTransactionsPage transactions={transactions} />
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { req, res } = context;

  const auth = await checkBackAuth({ req, res });

  if ("redirect" in auth) return auth;

  try {
    await connectDB();
    let transactions = await getTransactionsByUserId(auth?.session?.user?.id);
    transactions = JSON.parse(JSON.stringify(transactions));

    return {
      props: { transactions: !transactions.length ? [] : transactions },
    };
  } catch (err) {
    // console.log("err :", err);
    return {
      redirect: {
        destination: `/error?code=${
          err?.response?.status || err?.status || 500
        }`,
        permanent: false,
      },
    };
  }
}

export default Transactions;
